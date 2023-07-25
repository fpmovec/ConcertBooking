import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.errorNumber}>404</div>
      <div className={styles.description}>Page Not Found 🤔</div>
    </div>
  );
};