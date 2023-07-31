import styles from './SortPanel.module.css'

interface Props {
  value: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const TypeCheckbox = ({ value, label, handleChange }: Props) => {
  return (
    <>
      <label>
        <input className={styles.checkbox} type="checkbox" checked={value} onChange={handleChange} />
        {label}
      </label>
    </>
  );
};
