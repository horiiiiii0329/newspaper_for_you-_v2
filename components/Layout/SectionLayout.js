import styles from "./SectionLayout.module.scss";

function Layout({ children }) {
  return <section className={styles.wrapper}>{children}</section>;
}

export default Layout;
