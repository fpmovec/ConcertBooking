import styles from "./NotFound.module.css";

export const Forbidden = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.errorNumber}>403</div>
      <div className={styles.description}>Forbidden 🤔</div>
    </div>
  );
};