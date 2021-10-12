import { useState, useEffect } from "react";
import styles from "./AllArticle.module.scss";
import { supabase } from "../../api";
import AllArticleLIst from "./AllArticleLIst";

function AllArticle() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetchPosts();
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
        <div>
          {posts.map((post, index) => (
            <AllArticleLIst
              title={post.headline}
              time={post.time}
              company={post.company}
              key={index}
              link={post.link}
            />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default AllArticle;
