import styles from "./AllArticleList.module.scss";

function AllArticleLIst({
  title,
  time,
  company,
  link,
}: {
  title: string;
  time: string;
  company: string;
  link: string;
}) {
  return (
    <div className={styles.wrapper}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <p className={styles.title}>
          {title ? title : "null"}
          <span className={styles.company}>{company}</span>
        </p>

        <time className={styles.time}>発行日：{time}</time>
      </a>
    </div>
  );
}

export default AllArticleLIst;
