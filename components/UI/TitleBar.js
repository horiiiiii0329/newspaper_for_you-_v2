import { LightBulbIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/outline";
import styles from "./TitleBar.module.scss";
import { useState } from "react";

function TitleBar() {
  const [showModal, setShowModal] = useState(false);

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
          <MenuIcon
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
          />
        </div>
      </header>
      {showModal && (
        <div className={styles.menu}>
          <ul>
            <ul>
              <li>サインイン</li>
            </ul>
            <li>クリップした記事</li>
            <li>みんなの記事</li>
            <li>作成</li>
            <li>個人</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default TitleBar;
