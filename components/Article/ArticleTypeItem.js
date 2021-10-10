import { BsPlus } from "react-icons/bs";
import styles from "./ArticleTypeItem.module.scss";
import { IconContext } from "react-icons";
import { supabase } from "../../api";
import { useState } from "react";
import { v4 as uuid } from "uuid";

function ArticleTypeItem() {
  const [title, setTitle] = useState({ title: "" });

  function onChange(e) {
    setTitle(() => ({ [e.target.name]: e.target.value }));
  }

  async function createNewTitle() {
    if (!title) return;
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save-scrap-title")
      .insert([{ title: title.title, user_id: user.id }])
      .single();
    setTitle({ title: "" });
  }

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
        <div className={styles.addscrapicon} onClick={() => createNewTitle()}>
          <IconContext.Provider
            value={{ color: "black", size: "30px", cursor: "pointer" }}
          >
            <BsPlus />
          </IconContext.Provider>
        </div>
        <div>
          <input
            type="text"
            placeholder="タイトルを入力してください。。"
            onChange={onChange}
            name="title"
            value={title.title}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleTypeItem;
