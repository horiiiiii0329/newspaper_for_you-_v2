import { LightBulbIcon, XIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/outline";
import styles from "./TitleBar.module.scss";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../../api";
import AppWrapper from "../../context/state";
import { Session } from "@supabase/gotrue-js";

function TitleBar() {
  const [showModal, setShowModal] = useState(false);
  const [authState, setAuthenticatedState] = useState("");

  const appCtx = useContext(AppWrapper);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function handleAuthChange(event: string, session: Session | null) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState("authenticated");
    }
  }

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
              ?????????
            </li>
            <li
              onClick={() => {
                appCtx.setActiveContent("article");

                setShowModal(false);
              }}
            >
              ????????????????????????
            </li>
            <li
              onClick={() => {
                appCtx.setActiveContent("feed");

                setShowModal(false);
              }}
            >
              ??????????????????
            </li>
            <li
              onClick={() => {
                appCtx.setActiveContent("create");

                setShowModal(false);
              }}
            >
              ??????
            </li>
            <li
              onClick={() => {
                appCtx.setActiveContent("profile");
                setShowModal(false);
              }}
            >
              {authState === "authenticated" ? "??????" : "???????????????"}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default TitleBar;
