import Image from "next/image";
import styles from "./ArticleItem.module.scss";
import { useState, useEffect } from "react";
import { supabase } from "../../api";
import { HiDotsHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";

function ArticleItem({ newsArticle }) {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      .filter("user_id", "eq", user?.id);
    setPosts(data);
  }

  async function deletePost(id) {
    await supabase.from("posts").delete().match({ id });
    fetchPosts();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        {posts.map((item, index) => {
          return (
            <div className={styles.articleitem} key={index}>
              <div
                className={styles.articlemenu}
                onClick={() => setShowModal(!showModal)}
              >
                <IconContext.Provider
                  value={{ color: "black", size: "15px", cursor: "pointer" }}
                >
                  <HiDotsHorizontal />
                </IconContext.Provider>
              </div>

              <div className={styles.articlecontent}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <p>{item.headline ? item.headline : "null"}</p>
                  <time>{item.insertat.slice(0, 10)}</time>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArticleItem;
