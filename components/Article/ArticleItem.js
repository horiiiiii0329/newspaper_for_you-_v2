import Image from "next/image";
import styles from "./ArticleItem.module.scss";
import { useState, useEffect } from "react";
import { supabase } from "../../api";

function ArticleItem({ newsArticle }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    const mySubscription = supabase
      .from("save")
      .on("*", () => fetchPosts())
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, []);

  async function fetchPosts() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .select("*")
      .filter("user_id", "eq", user.id);
    setPosts(data);
  }

  async function deletePost(id) {
    await supabase.from("posts").delete().match({ id });
    fetchPosts();
  }

  return (
    <div className={styles.wrapper}>
      {posts.map((item, index) => {
        return (
          <div className={styles.articleitem} key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <p>{item.headline}</p>
              <p>{item.insertat.slice(0, 10)}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default ArticleItem;
