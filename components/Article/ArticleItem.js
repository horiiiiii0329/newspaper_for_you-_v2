import Image from "next/image";
import styles from "./ArticleItem.module.scss";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";
import ArticleItemCard from "./ArticleItemCard";

function ArticleItem({ newsArticle }) {
  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    appCtx.fetchPosts();
  }, []);

  async function deletePost(id) {
    await supabase.from("save").delete().match({ id });
    appCtx.fetchSelectedTitle();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        {appCtx.posts.map((item, index) => {
          return (
            <ArticleItemCard
              item={item}
              key={index}
              onDeleteHandler={deletePost}
            />
          );
        })}

        {appCtx.posts.length === 0 && (
          <div className={styles.articlecontent}>
            <p>見出しを追加してください</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleItem;
