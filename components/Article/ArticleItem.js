import Image from "next/image";
import moment from "moment";
import styles from "./ArticleItem.module.scss";

function ArticleItem({ newsArticle }) {
  console.log(newsArticle);
  return (
    <>
      {newsArticle.map((article, index) => {
        const time = moment(article.publishedAt || moment.now())
          .fromNow()
          .slice(0, 1);
        return (
          <a href={article.url} key={index} target="blank">
            <article className={styles.article__main}>
              <div className={styles.article_container__image}>
                {article.urlToImage && (
                  <img
                    key={index}
                    src={article.urlToImage}
                    className={styles.article__img}
                    alt={`${article.title} image`}
                  />
                )}
              </div>
              <div className={styles.article__title}>
                <p>{article.title}</p>
                <p>{article.description}</p>
                <p>
                  {time}
                  時間前
                </p>
              </div>
            </article>
          </a>
        );
      })}
    </>
  );
}

export default ArticleItem;
