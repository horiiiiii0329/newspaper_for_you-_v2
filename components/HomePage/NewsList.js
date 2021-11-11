import styles from "./NewsList.module.scss";
import NewsListItem from "./NewsListItem";

function NewsList({ newsData }) {
  console.log(newsData);
  return (
    <div className={styles.item__title}>
      {newsData.map((item, index) => {
        return <NewsListItem item={item} key={index} />;
      })}
    </div>
  );
}

export default NewsList;
