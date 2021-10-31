import { HiDotsHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import styles from "./ArticleItemCard.module.scss";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";

function ArticleItemCard({ item, onDeleteHandler }) {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [posts, setPosts] = useState([]);

  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    fetchList();
    const mySubscription = supabase
      .from("save-scrap-title")
      .on("*", () => fetchList())
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, []);

  async function fetchList() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save-scrap-title")
      .select("*")
      .filter("user_id", "eq", user?.id);
    setPosts(data);
  }

  async function addScrapTitle(title, id) {
    const { data, error } = await supabase
      .from("save")
      .update({ title: title })
      .match({ id });

    setShowAddModal(false);
    setShowModal(false);
    appCtx.fetchSelectedTitle();
  }

  return (
    <>
      <div className={styles.articleitem}>
        <div
          className={styles.articlemenu}
          onClick={() => {
            setShowModal(!showModal);
            setShowAddModal(false);
          }}
        >
          <IconContext.Provider
            value={{ color: "black", size: "15px", cursor: "pointer" }}
          >
            <HiDotsHorizontal />
          </IconContext.Provider>
        </div>

        {!showModal ? (
          <div className={styles.articlecontent}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <p>{item.headline ? item.headline : "null"}</p>
              <time>{item.insertat.slice(0, 10)}</time>
            </a>
          </div>
        ) : (
          <div className={styles.articlemenulist}>
            <div
              className={styles.addbutton}
              onClick={() => setShowAddModal(!showAddModal)}
            >
              <p>追加</p>
            </div>
            <div
              className={styles.deletebutton}
              onClick={() => {
                onDeleteHandler(item.id);
                setShowModal(false);
              }}
            >
              <p>除去</p>
            </div>
          </div>
        )}
      </div>
      {showAddModal &&
        posts.map((post, index) => {
          return (
            <div className={styles.articlemodal} key={key}>
              <div className={styles.articlemenu}></div>
              <div className={styles.articlemenulist}>
                <div
                  className={styles.addbutton}
                  onClick={() => addScrapTitle(post.title, item.id)}
                >
                  <p>{post.title}</p>
                </div>
                <div className={styles.deletebutton}>
                  <p></p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default ArticleItemCard;
