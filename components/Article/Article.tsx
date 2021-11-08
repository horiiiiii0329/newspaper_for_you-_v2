import styles from "./Article.module.scss";
import ArticleItem from "./ArticleItem";
import ArticleType from "./ArticleType";

function Article() {
  return (
    <div className={styles.wrapper}>
      <ArticleItem />
      <ArticleType />
    </div>
  );
}

export default Article;
