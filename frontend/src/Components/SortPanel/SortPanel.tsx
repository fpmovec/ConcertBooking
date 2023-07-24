

interface Props {
  value: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const TypeCheckbox = ({ value, label, handleChange }: Props) => {
  return (
    <>
      <label>
        <input style={{ marginRight: 5}}type="checkbox" checked={value} onChange={handleChange} />
        {label}
      </label>
    </>
  );
};
