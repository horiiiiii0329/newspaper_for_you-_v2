import Head from "next/head";
import AboutUs from "../components/AboutUs/AboutUs";
import Article from "../components/Article/Article";
import Header from "../components/Header/Header";
import HomePage from "../components/HomePage/HomePage";
import Post from "../components/Post/Post";
import Profile from "../components/Profile/Profile";
import styles from "../styles/Home.module.scss";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../api";
import SectionHeader from "../components/UI/SectionHeader";
import AuthUser from "../components/Profile/AuthUser";
import ProfileCard from "../components/Profile/ProfileCard";
import MyPosts from "../components/Profile/MyPost";
import MyPost from "../components/Profile/MyPost";
import AllArticle from "../components/AllArticle/AllArticle";
import EditProfile from "../components/Profile/EditProfile";
import TitleBar from "../components/UI/TitleBar";
import AppWrapper from "../context/state";

export default function Home({ user, weatherNews, asahiData, yomiuriData }) {
  const [activeContentOne, setActiveContentOne] = useState(false);
  const [activeContentTwo, setActiveContentTwo] = useState(false);
  const [activeContentThree, setActiveContentThree] = useState(false);
  const [activeContentFour, setActiveContentFour] = useState(false);
  const [authenticatedState, setAuthenticatedState] = useState(
    "not-authenticated"
  );

  const [activeData, setActiveData] = useState("Home");
  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    /* fires when a user signs in or out */
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
          {appCtx.selectedContent ===
          (
            <HomePage
              weatherNews={weatherNews}
              asahiData={asahiData}
              yomiuriData={yomiuriData}
              user={user}
            />
          )}
          {appCtx.selectedContent === "Homepage" && (
            <HomePage
              weatherNews={weatherNews}
              asahiData={asahiData}
              yomiuriData={yomiuriData}
              user={user}
            />
          )}
          {appCtx.selectedContent === "article" && <Article />}
          {appCtx.selectedContent === "feed" && <AllArticle />}
          {appCtx.selectedContent === "create" && <Post />}
          {appCtx.selectedContent === "profile" && (
            <>
              <ProfileCard />
              <MyPost />
            </>
          )}
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
            {authenticatedState === "not-authenticated" ? (
              <AuthUser />
            ) : (
              <Article />
            )}
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
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req }) {
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

  // get a newsheadline

  let asahiData;
  let yomiuriData;

  const yomiuri = await fetch(
    "https://erzss0zhpd.execute-api.us-east-1.amazonaws.com/default/fetchYomiuriData",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY,
      },
    }
  );
  const ydata = await yomiuri.json();
  yomiuriData = ydata.Items;

  const asahi = await fetch(
    "https://lm8gbiweyk.execute-api.us-east-1.amazonaws.com/default/fetchAsahiData",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.API_GATEWAY_APIKEY2,
      },
    }
  );
  const aData = await asahi.json();
  asahiData = aData.Items;

  // const asahi = await fetch("http://localhost:3000/api/getasahi");
  // asahiData = await asahi.json();
  // const yomiuri = await fetch("http://localhost:3000/api/getyomiuri");
  // yomiuriData = await yomiuri.json();

  if (!user) {
    return {
      props: {
        weatherNews,

        asahiData,
        yomiuriData,
      },
    };
  }

  return {
    props: {
      user,
      weatherNews,

      asahiData,
      yomiuriData,
    },
  };
}
