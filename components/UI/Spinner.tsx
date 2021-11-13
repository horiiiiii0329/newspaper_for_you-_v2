import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={styles.loading}>
      <span></span>
      <span></span>
      <span></span>
      <h2> ローディング中</h2>
    </div>
  );
}

export default Spinner;
