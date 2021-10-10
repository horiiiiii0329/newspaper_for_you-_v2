import { HiDotsHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import styles from "./ArticleItemCard.module.scss";
import { useState } from "react";

function ArticleItemCard({ item, key }) {
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
        "aaaaaaaaaa"
      )}
    </div>
  );
}

export default ArticleItemCard;
