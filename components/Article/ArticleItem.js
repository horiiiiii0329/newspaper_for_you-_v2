import Image from "next/image";
import styles from "./ArticleItem.module.scss";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";
import ArticleItemCard from "./ArticleItemCard";

function ArticleItem({ newsArticle }) {
  const [posts, setPosts] = useState([]);
  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    fetchPosts();
    const mySubscription = supabase
      .from("save")
      .on("*", () => fetchPosts())
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, [appCtx.selectedTitle]);

  async function fetchPosts() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .select("*")
      .match({ title: appCtx.selectedTitle })
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
