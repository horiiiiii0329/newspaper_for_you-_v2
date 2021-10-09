import styles from "./ArticleType.module.scss";

function ArticleType() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>スクラップブック</h3>
      </div>
      <div className={styles.categories}></div>
    </div>
  );
}

export default ArticleType;
