import Head from "next/head";
import AboutUs from "../components/AboutUs/AboutUs";
import Article from "../components/Article/Article";
import Header from "../components/Header/Header";
import HomePage from "../components/HomePage/HomePage";
import Post from "../components/Post/Post";
import Profile from "../components/Profile/Profile";
import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { supabase } from "../api";
import SectionHeader from "../components/UI/SectionHeader";
import AuthUser from "../components/Profile/AuthUser";
import ProfileCard from "../components/Profile/ProfileCard";
import MyPosts from "../components/Profile/MyPost";
import MyPost from "../components/Profile/MyPost";
import AllArticle from "../components/AllArticle/AllArticle";
import EditProfile from "../components/Profile/EditProfile";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({
  user,
  weatherNews,
  newsArticle,
  asahiData,
  yomiuriData,
  sankeiData,
  mainichiData,
  nihonData,
}) {
  const [activeContentOne, setActiveContentOne] = useState(false);
  const [activeContentTwo, setActiveContentTwo] = useState(false);
  const [activeContentThree, setActiveContentThree] = useState(false);
  const [activeContentFour, setActiveContentFour] = useState(false);
  const [authenticatedState, setAuthenticatedState] = useState(
    "not-authenticated"
  );
  const [login, setLogin] = useState(false);

  const mySubscription = supabase
    .from("*")
    .on("*", (payload) => {
      console.log("Change received!", payload);
    })
    .subscribe();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState("authenticated");
      setLogin(true);
    }
  }

  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  return (
    <div>
      <Head>
        <title>Newspaper for you</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.wrapper}>
        <section
          className={
            activeContentOne ||
            activeContentTwo ||
            activeContentThree ||
            activeContentFour
              ? styles.opacity
              : styles.content
          }
        >
          <HomePage
            weatherNews={weatherNews}
            newsArticle={newsArticle}
            asahiData={asahiData}
            yomiuriData={yomiuriData}
            sankeiData={sankeiData}
            mainichiData={mainichiData}
            nihonData={nihonData}
            user={user}
          />
        </section>
        <section
          className={styles.content_wrapper}
          style={{
            transform:
              activeContentOne ||
              activeContentTwo ||
              activeContentThree ||
              activeContentFour
                ? "translateX(0%)"
                : "translateX(100%)",
          }}
        >
          <div
            onClick={() => {
              setActiveContentOne(!activeContentOne);
              setActiveContentTwo(false);
              setActiveContentThree(false);
              setActiveContentFour(false);
            }}
          >
            <SectionHeader title="クリップした記事" number="01" />
          </div>
          <div className={activeContentOne ? styles.content : styles.opacity}>
            <Article newsArticle={newsArticle} />
          </div>
        </section>
        <section
          className={styles.content_wrapper}
          style={{
            transform:
              activeContentTwo || activeContentThree || activeContentFour
                ? "translateX(0%)"
                : "translateX(100%)",
            left: "160px",
          }}
        >
          <div
            onClick={() => {
              setActiveContentTwo(!activeContentTwo);
              setActiveContentOne(false);
              setActiveContentThree(false);
              setActiveContentFour(false);
            }}
          >
            <SectionHeader title="みんなの記事" number="02" />
          </div>
          <div className={activeContentTwo ? styles.content : styles.opacity}>
            <AllArticle />
          </div>
        </section>

        <section
          className={styles.content_wrapper}
          style={{
            transform:
              activeContentThree || activeContentFour
                ? "translateX(0%)"
                : "translateX(100%)",

            left: "240px",
          }}
        >
          <div
            onClick={() => {
              setActiveContentThree(!activeContentThree);
              setActiveContentOne(false);
              setActiveContentTwo(false);
              setActiveContentFour(false);
            }}
          >
            <SectionHeader title="作成" number="03" />
          </div>
          <div className={activeContentThree ? styles.content : styles.opacity}>
            {authenticatedState === "not-authenticated" ? (
              <AuthUser />
            ) : (
              <Post />
            )}
          </div>
        </section>
        <section
          className={styles.content_wrapper}
          style={{
            transform: activeContentFour && "translateX(0%)",
            left: "320px",
          }}
        >
          <div
            onClick={() => {
              setActiveContentFour(!activeContentFour);
              setActiveContentOne(false);
              setActiveContentTwo(false);
              setActiveContentThree(false);
            }}
          >
            <SectionHeader title="個人" number="04" />
          </div>
          <div className={activeContentFour ? styles.content : styles.opacity}>
            {authenticatedState === "not-authenticated" ? (
              <AuthUser />
            ) : (
              <>
                <ProfileCard />
                <MyPost />
                <EditProfile user={user} />
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export const getStaticProps = async ({ req }) => {
  //setUserCookie
  const { user } = await supabase.auth.api.getUserByCookie(req);

  //getWeatherData

  let lat = 35.4122;
  let long = 139.413;

  const exclude = "hourly,minutely";
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=ja_JP&units=metric&exclude=${exclude}&appid=03b21e4bac7cd1542bebd0ccb127a6e5`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  const news = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=50&apiKey=4d54bfed526d4c3cb6f11ca35ba80191`
  );
  const newsData = await news.json();
  const newsArticle = newsData?.articles;

  //get a newsheadline
  const sankei = await fetch("http://localhost:3000/api/getsankei");
  const sankeiData = await sankei.json();

  const asahi = await fetch("http://localhost:3000/api/getasahi");
  const asahiData = await asahi.json();

  const mainichi = await fetch("http://localhost:3000/api/getmainichi");
  const mainichiData = await mainichi.json();

  const nihon = await fetch("http://localhost:3000/api/getnihonkeizai");
  const nihonData = await nihon.json();

  const yomiuri = await fetch("http://localhost:3000/api/getyomiuri");
  const yomiuriData = await yomiuri.json();

  if (!user) {
    return {
      props: {
        weatherNews,
        newsArticle,
        asahiData,
        yomiuriData,
        sankeiData,
        mainichiData,
        nihonData,
      },
    };
  }

  return {
    props: {
      user,
      weatherNews,
      newsArticle,
      asahiData,
      yomiuriData,
      sankeiData,
      mainichiData,
      nihonData,
    },
  };
};
