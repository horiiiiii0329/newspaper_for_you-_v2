import { LightBulbIcon } from "@heroicons/react/outline";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <header className={styles.Header}>
      <LightBulbIcon
        style={{ width: "80px", height: "80px", cursor: "pointer" }}
        onClick={() => {
          router.push("/");
          router.reload();
        }}
      />
    </header>
  );
}

export default Header;
