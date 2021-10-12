import { useState, useEffect } from "react";
import styles from "./AllArticle.module.scss";
import { supabase } from "../../api";
import AllArticleList from "./AllArticleList";
import AllArticleType from "./AllArticleType";

function AllArticle() {
  const [posts, setPosts] = useState([]);
  const [titles, setTitle] = useState([]);
  const [company, setCompany] = useState([]);
  const [activeContent1, setActiveContent1] = useState(true);
  const [activeContent2, setActiveContent2] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchTitle();
    fetchCompany();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("save").select("*");

    setPosts(data);
  }

  async function fetchCompany() {
    const { data } = await supabase.from("save").select("company");

    setCompany(data);
  }

  async function fetchTitle() {
    const { data } = await supabase.from("save-scrap-title").select("*");

    setTitle(data);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        {posts.map((post, index) => (
          <AllArticleList
            title={post.headline}
            time={post.time}
            company={post.company}
            key={index}
            link={post.link}
          />
        ))}
      </div>
      <div className={styles.content_wrapper2}>
        <div className={styles.categories}>
          <p
            onClick={() => {
              setActiveContent1(true);
              setActiveContent2(false);
            }}
            className={activeContent1 && styles.activecontent}
          >
            媒体
          </p>
          <p
            onClick={() => {
              setActiveContent1(false);
              setActiveContent2(true);
            }}
            className={activeContent2 && styles.activecontent2}
          >
            スクラップブック
          </p>
        </div>
        {titles.map((title, index) => (
          <AllArticleType title={title.title} key={index} />
        ))}
      </div>
    </div>
  );
}

export default AllArticle;
