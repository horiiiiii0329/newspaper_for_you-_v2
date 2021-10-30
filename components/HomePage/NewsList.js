import styles from "./NewsList.module.scss";
import { AiOutlineSave } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";

const initialState = { company: "", headline: "", link: "", time: "" };

function NewsList({ newsData }) {
  const [sending, setIsSending] = useState("");
  const [status, setStatus] = useState("");
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
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .insert([{ company, headline, user_id: user?.id, link, time }])
      .single();

    appCtx.fetchSelectedTitle("");
  }

  return (
    <div className={styles.item__title}>
      {newsData.map((item, index) => {
        return (
          <div key={index}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <p>{item.title}</p>
            </a>
            {user && (
              <p
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
                <IconContext.Provider value={iconColor}>
                  <AiOutlineSave />
                </IconContext.Provider>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default NewsList;
