import styles from "./Modal.module.css";

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}

export const Modal = ({ active, setActive, children }: Props) => {
  return (
    active && (
      <div className={styles.modal} onClick={() => setActive(false)}>
        <div
          className={styles.modal_content}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )
  );
};
