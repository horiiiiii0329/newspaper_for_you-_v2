import Image from "next/image";
import styles from "./ArticleItem.module.scss";
import { useState, useEffect } from "react";
import { supabase } from "../../api";

function ArticleItem({ newsArticle }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
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
    <>
      {posts.map((item, index) => {
        return (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <p>{item.headline}</p>
            <p>{item.time}</p>
          </a>
        );
      })}
    </>
  );
}

export default ArticleItem;
