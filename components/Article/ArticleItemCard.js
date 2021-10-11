import { HiDotsHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import styles from "./ArticleItemCard.module.scss";
import { useState } from "react";
import { supabase } from "../../api";

function ArticleItemCard({ item, key, onDeleteHandler }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.articleitem} key={key}>
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

      {!showModal ? (
        <div className={styles.articlecontent}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <p>{item.headline ? item.headline : "null"}</p>
            <time>{item.insertat.slice(0, 10)}</time>
          </a>
        </div>
      ) : (
        <div className={styles.articleMenu}>
          <p>追加</p>
          <p
            onClick={() => {
              onDeleteHandler(item.id);
              setShowModal(false);
            }}
          >
            除去
          </p>
        </div>
      )}
    </div>
  );
}

export default ArticleItemCard;
