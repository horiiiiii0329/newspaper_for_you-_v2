import styles from "./ArticleTypeItem.module.scss";
import { PlusIcon } from "@heroicons/react/outline";

import { supabase } from "../../api";
import { useState, useEffect, useContext } from "react";
import AppWrapper from "../../context/state";

interface Title {
  title: string;
}

function ArticleTypeItem() {
  const [title, setTitle] = useState<Title>({ title: "" });
  const [posts, setPosts] = useState([] as any);

  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save-scrap-title")
      .select("*")
      .filter("user_id", "eq", user?.id);
    setPosts(data);
  }

  async function createNewTitle() {
    if (!title.title) return;
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save-scrap-title")
      .insert([{ title: title.title, user_id: user?.id }])
      .single();
    setTitle({ title: "" });
    fetchList();
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setTitle({ title: e.target.value });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.scraplist}>
        <div className={styles.scrapelist__count}>
          <p>00</p>
        </div>
        <div
          className={styles.scraplist__title}
          onClick={() => {
            appCtx.setSelectedTitle("全て");
            appCtx.fetchSelectedTitle();
          }}
        >
          <h3>未分類</h3>
        </div>
      </div>

      {posts &&
        posts.map((post: Title, index: number) => {
          return (
            <div className={styles.scraplist} key={index}>
              <div className={styles.scrapelist__count}>
                <p>{`0${index + 1}`}</p>
              </div>
              <div
                className={styles.scraplist__title}
                onClick={() => {
                  appCtx.setSelectedTitle(post.title);
                  appCtx.fetchSelectedTitle();
                }}
              >
                <h3>{post.title}</h3>
              </div>
            </div>
          );
        })}

      <div className={styles.addscrap}>
        <div
          className={styles.addscrapicon}
          onClick={() => {
            createNewTitle();
            fetchList();
          }}
        >
          <PlusIcon
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
        </div>

        <input
          type="text"
          placeholder="タイトルを入力してください。。"
          onChange={onChangeHandler}
          name="title"
          value={title.title}
        />
      </div>
    </div>
  );
}

export default ArticleTypeItem;
