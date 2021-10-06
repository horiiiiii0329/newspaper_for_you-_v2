import styles from "./NewsList.module.scss";
import { RiSaveLine } from "react-icons/fa";

function NewsList({ asahiData, user }) {
  return (
    <div className={styles.item__title}>
      {asahiData.map((item, index) => {
        return (
          <div key={index}>
            <div>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <p>{item.title}</p>
                <p>{item.time}</p>
              </a>
            </div>
            <div>
              <RiSaveLine />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NewsList;
