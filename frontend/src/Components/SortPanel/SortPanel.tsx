import { Dispatch } from 'react'
import { SetStateAction, useState } from "react";
import { IConcertType } from "../../Pages/HomePage/HomePage";

interface Props {
  value: boolean;
  handleChange: () => void;
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
