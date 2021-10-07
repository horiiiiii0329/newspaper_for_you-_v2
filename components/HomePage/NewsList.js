import styles from "./NewsList.module.scss";
import { AiOutlineSave } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "../../api";

const initialState = { company: "", headline: "", link: "" };

function NewsList({ newsData }) {
  const [sending, setIsSending] = useState("pending");
  const [status, setStatus] = useState("");
  const [savedData, setSavedData] = useState(initialState);
  const { company, headline, link } = savedData;
  const user = supabase.auth.user();
  console.log(savedData);

  async function savePost() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .insert([{ company, headline, user_id: user.id, link }])
      .single();
  }

  return (
    <div className={styles.item__title}>
      {newsData.map((item, index) => {
        return (
          <div key={index}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <p>{item.title}</p>
              <p>{item.time}</p>
            </a>
            {user && (
              <p
                onClick={() => {
                  setSavedData({
                    company: "",
                    headline: item.title,
                    link: item.href,
                  });
                  savePost();
                }}
              >
                <IconContext.Provider
                  value={{ color: "black", size: "15px", cursor: "pointer" }}
                >
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
