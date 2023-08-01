import { useForm } from "react-hook-form";
import styles from "./AddConcertPage.module.css";
import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import { useAppDispatch } from "../../../Redux/Hooks";
import { addOpenAir } from "../../../Redux/Slices";
import { useState } from 'react'

interface Props {
  concertId: number;
}

type FormData = {
  headliner: string;
  journey: string;
};

export const OpenAitProps = ({ concertId }: Props) => {
const dispatch = useAppDispatch();
    const [isSuccessfully, setIsSuccesfully] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const submitForm = (data: FormData) => {
   dispatch(addOpenAir({
      concertId: concertId,
      headliner: data.headliner,
      journey: data.journey,
    }));
    setIsSuccesfully(true);
  };

  return (
    <form className={styles.form} onSubmit={e => void handleSubmit(submitForm)(e)}>
      <div>
        <label htmlFor="head">Headliner: </label>
        <input
          id="head"
          type="text"
          {...register("headliner", { required: true, minLength: 3 })}
        />
        {errors.headliner && errors.headliner.type === "required" && (
          <ErrorField data="Enter the headliner" />
        )}
        {errors.headliner && errors.headliner.type === "minLength" && (
          <ErrorField data="This field must be contained at least 3 characters" />
        )}
      </div>

      <div>
        <label htmlFor="journey">Journey: </label>
        <input
          id="journey"
          type="text"
          {...register("journey", { required: true, minLength: 5 })}
        />
        {errors.journey && errors.journey.type === "required" && (
          <ErrorField data="Enter the journey" />
        )}
        {errors.journey && errors.journey.type === "minLength" && (
          <ErrorField data="This field must be contained at least 5 characters" />
        )}
      </div>
      <button type="submit">Add concert</button>
      {isSuccessfully && <div className={styles.success}>The concert is successfully added</div>}
    </form>
  );
};
