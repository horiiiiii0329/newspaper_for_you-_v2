import React from "react";
import styles from "./SectionLayout.module.scss";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <section className={styles.wrapper}>{children}</section>;
}

export default Layout;
