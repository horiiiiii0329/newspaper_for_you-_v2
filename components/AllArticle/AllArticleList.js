import styles from "./AllArticleList.module.scss";

function AllArticleLIst({ title, time, company, key, link }) {
  return (
    <div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <p>{title ? title : "null"}</p>
        <p>{company}</p>
        <time>{time}</time>
      </a>
    </div>
  );
}

export default AllArticleLIst;
