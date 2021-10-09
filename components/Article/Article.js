import styles from "./Article.module.scss";
import { useState } from "react";
import ArticleItem from "./ArticleItem";
import ArticleType from "./ArticleType";

function Article({ newsArticle }) {
  const [isActive, setisActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <ArticleItem newsArticle={newsArticle} />
      <ArticleType />
    </div>
  );
}

export default Article;
