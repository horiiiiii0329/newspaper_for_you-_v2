import { LightBulbIcon, XIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/outline";
import styles from "./TitleBar.module.scss";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";

function TitleBar() {
  const [showModal, setShowModal] = useState(false);
  const [authState, setAuthenticatedState] = useState("");

  const appCtx = useContext(AppWrapper);

  return (
    <>
      <header className={styles.Header}>
        <div>
          <LightBulbIcon
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
            onClick={() => {}}
          />
        </div>
        <div onClick={() => setShowModal(!showModal)}>
          {showModal ? (
            <XIcon
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
          ) : (
            <MenuIcon
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
          )}
        </div>
      </header>
      {showModal && (
        <div className={styles.menu}>
          <ul>
            <li
              onClick={() => {
                appCtx.setActiveContent("Homepage");

                setShowModal(false);
              }}
            >
              ホーム
            </li>
            <li
              onClick={() => {
                appCtx.setActiveContent("Article");

                setShowModal(false);
              }}
            >
              クリップした記事
            </li>
            <li
              onClick={() => {
                appCtx.setActiveContent("feed");

                setShowModal(false);
              }}
            >
              みんなの記事
            </li>
            <li
              onClick={() => {
                appCtx.setActiveContent("create");

                setShowModal(false);
              }}
            >
              作成
            </li>
            <li
              onClick={() => {
                setShowModal(false);
              }}
            >
              {authState === "authenticated" ? "個人" : "サインイン"}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default TitleBar;
