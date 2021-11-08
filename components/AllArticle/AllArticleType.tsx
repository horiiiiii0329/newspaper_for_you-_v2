import styles from "./AllArticleType.module.scss";

function AllArticleType({ title, index }: { title: string; index: number }) {
  return (
    <div className={styles.scraplist}>
      <div className={styles.scrapelist__count}>
        <p>{`0${index + 1}`}</p>
      </div>
      <div className={styles.scraplist__title}>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default AllArticleType;
