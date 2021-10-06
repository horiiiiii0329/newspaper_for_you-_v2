import styles from "./NewsList.module.scss";
import { AiOutlineSave } from "react-icons/ai";
import { IconContext } from "react-icons";

function NewsList({ newsData, user }) {
  return (
    <div className={styles.item__title}>
      {newsData.map((item, index) => {
        return (
          <div key={index}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <p>{item.title}</p>
              <p>{item.time}</p>
            </a>
            <p>
              <IconContext.Provider
                value={{ color: "black", size: "15px", cursor: "pointer" }}
              >
                <AiOutlineSave />
              </IconContext.Provider>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default NewsList;
