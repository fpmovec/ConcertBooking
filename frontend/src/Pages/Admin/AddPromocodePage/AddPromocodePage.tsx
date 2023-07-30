import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import styles from "./AddPromocodePage.module.css";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks";
import { Promocode } from "../../../Models/Promocode";
import { setPromocodes } from "../../../Redux/Slices";
import React from "react";

type PromocodeData = {
  code: string;
  discount: number;
};

export const AddPromocodePage = () => {
  const [isSucces, setIsSuccess] = React.useState(false);
  const dispath = useAppDispatch();
  const promocodes = useAppSelector((state) => state.concerts.promocodes);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromocodeData>({
    mode: "all",
  });

  const submitForm = (data: PromocodeData) => {
    const promo: Promocode = {
      code: data.code,
      total: 1 - data.discount * 0.01,
    };
    console.log(promo);
    dispath(setPromocodes([...promocodes, promo]));
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Add a promocode</div>
      <div>
        <form
          onSubmit={(event) => void handleSubmit(submitForm)(event)}
          className={styles.form}
        >
          <div>
            <label htmlFor="code">Code: </label>
            <input
              id="code"
              type="text"
              {...register("code", { required: true, minLength: 3 })}
            />
            {errors.code && errors.code.type === "required" && (
              <ErrorField data="Enter the promocode" />
            )}
            {errors.code && errors.code.type === "minLength" && (
              <ErrorField data="This field must be contained at least 3 characters" />
            )}
          </div>
          <div>
            <label htmlFor="disc">Discount, %: </label>
            <input
              id="disc"
              type="number"
              {...register("discount", { required: true, min: 3, max: 30 })}
              defaultValue={3}
            />
            {errors.discount && errors.discount.type === "required" && (
              <ErrorField data="Enter the discount" />
            )}
            {errors.discount && errors.discount.type === "min" && (
              <ErrorField data="The discount must be at least 3%" />
            )}
            {errors.discount && errors.discount.type === "max" && (
              <ErrorField data="The discount should not exceed 25%" />
            )}
          </div>

          <button onClick={() => setIsSuccess(true)} type="submit">
            Add the promocode
          </button>
          {isSucces && (
            <div style={{ color: "green" }}>
              The promocode is successfully added
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
