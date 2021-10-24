import { LightBulbIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/outline";
import styles from "./TitleBar.module.scss";

function TitleBar() {
  return (
    <header className={styles.Header}>
      <div>
        <LightBulbIcon
          style={{ width: "80px", height: "80px", cursor: "pointer" }}
          onClick={() => {}}
        />
      </div>
      <div>
        <MenuIcon
          style={{ width: "80px", height: "80px", cursor: "pointer" }}
        />
      </div>
    </header>
  );
}

export default TitleBar;
