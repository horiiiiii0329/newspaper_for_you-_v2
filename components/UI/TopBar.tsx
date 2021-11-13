import { ReactNode } from "react";
import styles from "./TopBar.module.scss";

function TopBar({ children }: { children: ReactNode }) {
  return <div className={styles.topbar}>{children}</div>;
}

export default TopBar;
