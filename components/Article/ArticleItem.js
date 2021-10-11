import Image from "next/image";
import styles from "./ArticleItem.module.scss";
import { useState, useEffect } from "react";
import { supabase } from "../../api";

import ArticleItemCard from "./ArticleItemCard";

function ArticleItem({ newsArticle }) {
  const [posts, setPosts] = useState([]);
  const [filteredTitle, setfilteredTitle] = useState("");

  function filterPost() {
    const filteredData = posts.filter((post) => posts.title === filteredTitle);
    setfilteredTitle(filteredData);
  }

  useEffect(() => {
    fetchPosts();
    const mySubscription = supabase
      .from("save")
      .on("*", () => fetchPosts(filteredTitle))
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, [filteredTitle]);

  async function fetchPosts(filteredTitle) {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .select("*")
      .eq("title", "*")
      .filter("user_id", "eq", user?.id);

    setPosts(data);
  }

  async function deletePost(id) {
    await supabase.from("save").delete().match({ id });
    fetchPosts();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        {posts.map((item, index) => {
          return (
            <ArticleItemCard
              item={item}
              key={index}
              onDeleteHandler={deletePost}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ArticleItem;
