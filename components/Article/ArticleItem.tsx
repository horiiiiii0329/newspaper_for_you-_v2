import styles from "./ArticleItem.module.scss";
import { useEffect, useContext } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";
import ArticleItemCard from "./ArticleItemCard";

function ArticleItem() {
  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    const user = supabase.auth.user();
    const fetchData = async () => {
      const data = await appCtx.fetchPosts();
    };
    if (user?.id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deletePost(id: string) {
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
