import {
  LightBulbIcon,
  NewspaperIcon,
  ScissorsIcon,
  CloudIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";

function Header() {
  const router = useRouter();

  return (
    <header className={styles.Header}>
      <div>
        <LightBulbIcon
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
          onClick={() => {
            router.push("/");
            router.reload();
          }}
        />
      </div>
      <nav></nav>
      <div></div>
    </header>
  );
}

export default Header;
