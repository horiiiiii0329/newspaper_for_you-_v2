import { BsPlus } from "react-icons/bs";
import styles from "./ArticleTypeItem.module.scss";
import { IconContext } from "react-icons";
import { supabase } from "../../api";
import { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import AppWrapper from "../../context/state";

function ArticleTypeItem({ filterTitleHandler }) {
  const [title, setTitle] = useState({ title: "" });
  const [posts, setPosts] = useState([]);

  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    fetchList();
    const mySubscription = supabase
      .from("save-scrap-title")
      .on("*", () => fetchList())
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, []);

  async function fetchList() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save-scrap-title")
      .select("*")
      .filter("user_id", "eq", user?.id);
    setPosts(data);
  }

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
        <div
          className={styles.scraplist__title}
          onClick={() => appCtx.setSelectedTitle("全て")}
        >
          <h3>未分類</h3>
        </div>
      </div>

      {posts.map((post, index) => {
        return (
          <div className={styles.scraplist} key={index}>
            <div className={styles.scrapelist__count}>
              <p>{`0${index + 1}`}</p>
            </div>
            <div
              className={styles.scraplist__title}
              onClick={() => appCtx.setSelectedTitle(post.title)}
            >
              <h3>{post.title}</h3>
            </div>
          </div>
        );
      })}

      <div className={styles.addscrap}>
        <div className={styles.addscrapicon} onClick={() => createNewTitle()}>
          <IconContext.Provider
            value={{ color: "black", size: "20px", cursor: "pointer" }}
          >
            <BsPlus />
          </IconContext.Provider>
        </div>
        <div className={styles.input}>
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
