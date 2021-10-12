import { useState, useEffect } from "react";
import styles from "./AllArticle.module.scss";

function AllArticle() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const user = supabase.auth.user();
    const { data } = await supabase.from("save").select("*");

    setPosts(data);
  }

  async function fetchTitle() {
    const user = supabase.auth.user();
    const { data } = await supabase.from("save-scrap-title").select("*");

    setPosts(data);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}></div>
    </div>
  );
}

export default AllArticle;
