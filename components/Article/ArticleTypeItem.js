import { BsPlus } from "react-icons/bs";
import styles from "./ArticleTypeItem.module.scss";
import { IconContext } from "react-icons";

function ArticleTypeItem() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scraplist}>
        <div className={styles.scrapelist__count}>
          <p>00</p>
        </div>
        <div>
          <h3>架空文春</h3>
        </div>
      </div>
      <div className={styles.addscrap}>
        <div className={styles.addscrapicon}>
          <IconContext.Provider
            value={{ color: "black", size: "30px", cursor: "pointer" }}
          >
            <BsPlus />
          </IconContext.Provider>
        </div>
        <div>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}

export default ArticleTypeItem;
