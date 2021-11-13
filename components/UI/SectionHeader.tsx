import styles from "./SectionHeader.module.scss";

function SectionHeader({
  number,
  title,
  onClick,
}: {
  number: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <header className={styles.wrapper} onClick={onClick}>
      <span className={styles.number}>{number}</span>
      <span className={styles.title}>{title}</span>
    </header>
  );
}

export default SectionHeader;
