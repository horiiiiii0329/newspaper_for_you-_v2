import styles from "./ArticleType.module.scss";
import ArticleTypeItem from "./ArticleTypeItem";

function ArticleType() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>スクラップブック</h3>
      </div>
      <div className={styles.categories}>
        <ArticleTypeItem />
      </div>
    </div>
  );
}

export default ArticleType;
