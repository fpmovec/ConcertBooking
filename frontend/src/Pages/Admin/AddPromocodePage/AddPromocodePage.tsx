import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import styles from "./AddPromocodePage.module.css";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { PostPromocode } from "../../../Requests/POST/PromocodesRequest";
import { useAppSelector, useAppDispatch } from "../../../Redux/Hooks";
import { GetPromocodes } from "../../../Requests/GET/PromocodesRequests";
import { setPromocodes } from "../../../Redux/Slices";


type PromocodeData = {
  code: string;
  discount: number;
};

export const AddPromocodePage = () => {
  const [isSucces, setIsSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromocodeData>({
    mode: "all",
  });

const promocodes = useAppSelector(state =>  state.concerts.promocodes);
const dispatch = useAppDispatch();
   React.useEffect(() => {
    const doGet = async () => {
        const promo = await GetPromocodes();
        dispatch(setPromocodes(promo));
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doGet();
   }, [dispatch]);

  const IsUnique = (name: string): boolean => {
    return promocodes.some((c) => c.code === name);
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const submitForm = (data: PromocodeData) => {
    setIsSuccess(true);
    const add = async () => {
      setIsButtonDisabled(true);
      await PostPromocode({
        code: data.code,
        total: 1 - data.discount * 0.01,
      });
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    add();
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
            <label style={{
              display: "inline-block",
              width: 120
            }} htmlFor="code">Code: </label>
            <input
              id="code"
              type="text"
              {...register("code", { required: true, minLength: 3, validate: {
                isUnique: (c) => IsUnique(c) === false
              } })}
            />
            {errors.code && errors.code.type === "required" && (
              <ErrorField data="Enter the promocode" />
            )}
            {errors.code && errors.code.type === "minLength" && (
              <ErrorField data="This field must be contained at least 3 characters" />
            )}
            {errors.code && errors.code.type === "isUnique" && (
              <ErrorField data="The promocode must be unique" />
            )}
          </div>
          <div>
            <label style={{
              display: "inline-block",
              width: 120
            }}
            htmlFor="disc">Discount, %: </label>
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

          <button disabled={isButtonDisabled} type="submit">
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
