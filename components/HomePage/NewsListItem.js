import styles from "./NewsListItem.module.scss";
import { useState, useContext } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";
import { CheckIcon, ScissorsIcon } from "@heroicons/react/outline";

const initialState = { company: "", headline: "", link: "", time: "" };

function NewsListItem({ item }) {
  const [status, setStatus] = useState(false);
  const [savedData, setSavedData] = useState(initialState);
  const { company, headline, link, time } = savedData;
  const appCtx = useContext(AppWrapper);

  const user = supabase.auth.user();

  async function savePost() {
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
    }
  }

  const scissors = (
    <ScissorsIcon
      style={{ width: "35px", height: "35px", cursor: "pointer" }}
    />
  );

  const done = (
    <CheckIcon style={{ width: "35px", height: "35px", cursor: "pointer" }} />
  );
  return (
    <div className={styles.item__item}>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        <p>{item.title}</p>
      </a>
      {user && (
        <div
          onClick={() => {
            setSavedData({
              company: item.company,
              headline: item.title,
              link: item.href,
              time: item.time,
            });
            savePost();
          }}
        >
          {status ? done : scissors}
        </div>
      )}
    </div>
  );
}

export default NewsListItem;
