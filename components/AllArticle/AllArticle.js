import { useState, useEffect } from "react";
import styles from "./AllArticle.module.scss";
import { supabase } from "../../api";
import AllArticleList from "./AllArticleList";
import AllArticleType from "./AllArticleType";

function AllArticle() {
  const [posts, setPosts] = useState([]);
  const [titles, setTitle] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchTitle();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("save").select("*");

    setPosts(data);
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
          <p>媒体</p>
          <p>スクラップブック</p>
        </div>
        {titles.map((title, index) => (
          <AllArticleType title={title.title} key={index} />
        ))}
      </div>
    </div>
  );
}

export default AllArticle;
