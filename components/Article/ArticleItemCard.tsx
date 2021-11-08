import { HiDotsHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import styles from "./ArticleItemCard.module.scss";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

interface NewsList {
  id: string;
  insertat: string;
  headline: string;
  link: string;
  title: string;
}

function ArticleItemCard({
  item,
  onDeleteHandler,
}: {
  item: NewsList;
  onDeleteHandler: (id: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [posts, setPosts] = useState([] as any);

  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    fetchList();
    const mySubscription = supabase
      .from("save-scrap-title")
      .on("*", () => fetchList())
      .subscribe();
    return () => {
      supabase.removeSubscription(mySubscription);
    };
  }, []);

  async function fetchList() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save-scrap-title")
      .select("*")
      .filter("user_id", "eq", user?.id);
    setPosts(data);
  }

  async function addScrapTitle(title: string, id: string) {
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
          <DotsHorizontalIcon
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
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
              onClick={() => {
                setShowAddModal(!showAddModal);
                fetchList();
              }}
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
        posts?.map((post: NewsList, index: number) => {
          return (
            <div className={styles.articlemodal} key={index}>
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
