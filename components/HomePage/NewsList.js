import styles from "./NewsList.module.scss";
import { AiOutlineSave } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";
import { CheckIcon, ScissorsIcon } from "@heroicons/react/outline";

const initialState = { company: "", headline: "", link: "", time: "" };

function NewsList({ newsData }) {
  const [sending, setIsSending] = useState("");
  const [status, setStatus] = useState(false);
  const [savedData, setSavedData] = useState(initialState);
  const { company, headline, link, time } = savedData;
  const [iconColor, setIconColor] = useState({
    color: "black",
    size: "15px",
    cursor: "pointer",
  });
  const appCtx = useContext(AppWrapper);

  const user = supabase.auth.user();

  async function savePost() {
    setStatus(false);
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .insert([{ company, headline, user_id: user?.id, link, time }])
      .single();
    setStatus(true);
    appCtx.fetchSelectedTitle("");
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
    <div className={styles.item__title}>
      {newsData.map((item, index) => {
        return (
          <div key={index} className={styles.item__item}>
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
      })}
    </div>
  );
}

export default NewsList;
