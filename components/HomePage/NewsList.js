import styles from "./NewsList.module.scss";

function NewsList({ asahiData }) {
  return (
    <div className={styles.item__title}>
      {asahiData.map((item, index) => {
        return (
          <div key={index}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <p>{item.title}</p>
              <p>{item.time}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default NewsList;
