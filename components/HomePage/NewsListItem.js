import styles from "./NewsListItem.module.scss";
import { useState, useContext, useEffect } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";
import { CheckIcon, ScissorsIcon } from "@heroicons/react/outline";

function NewsListItem({ item }) {
  const [status, setStatus] = useState(false);

  const appCtx = useContext(AppWrapper);
  const user = supabase.auth.user();

  useEffect(() => {
    return;
  }, []);

  async function fetchSavedTitle() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .select("*")
      .match({ headline: item.title })
      .filter("user_id", "eq", user?.id);

    setPosts(data);
  }

  async function savePost({ company, headline, link, time }) {
    try {
      setStatus(false);
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("save")
        .insert([{ company, headline, user_id: user.id, link, time }]);
    } catch {
      alert(error.message);
    } finally {
      setStatus(true);
      appCtx.fetchSelectedTitle("");
    }
  }

  async function savePost({ company, headline, link, time }) {
    try {
      setStatus(false);
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("save")
        .insert([{ company, headline, user_id: user.id, link, time }]);
    } catch {
      alert(error.message);
    } finally {
      setStatus(true);
      appCtx.fetchSelectedTitle("");
    }
  }

  const scissors = (
    <ScissorsIcon
      style={{ width: "30px", height: "30px", cursor: "pointer" }}
    />
  );

  const done = (
    <CheckIcon style={{ width: "30px", height: "30px", cursor: "pointer" }} />
  );
  return (
    <div className={styles.item__item}>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        <p>{item.title}</p>
      </a>
      {user && (
        <div
          onClick={() => {
            savePost({
              company: item.company,
              headline: item.title,
              link: item.href,
              time: item.time,
            });
          }}
        >
          {status ? done : scissors}
        </div>
      )}
    </div>
  );
}

export default NewsListItem;
