import { useForm } from "react-hook-form";
import styles from "./AddConcertPage.module.css";
import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import { useAppDispatch } from "../../../Redux/Hooks";
//import { addClassic } from "../../../Redux/Slices";
import { useState } from "react";

interface Props {
  concertId: number;
}

type FormData = {
  voiceType: string;
  concertName: string;
  composer: string;
};

export const ClassicProps = ({ concertId }: Props) => {

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const [isSuccessfully, setIsSuccessfully] = useState(false);

  const submitForm = (data: FormData) => {
    //dispatch(addClassic({
     // concertId: concertId,
     // voiceType: data.voiceType,
     // concertName: data.concertName,
     // composer: data.composer,
    //}));
    setIsSuccessfully(true);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => void handleSubmit(submitForm)(e)}
    >
      <div>
        <label htmlFor="voice">Voice type: </label>
        <input
          id="voice"
          type="text"
          {...register("voiceType", { required: true, minLength: 3 })}
        />
        {errors.voiceType && errors.voiceType.type === "required" && (
          <ErrorField data="Enter the voice type" />
        )}
        {errors.voiceType && errors.voiceType.type === "minLength" && (
          <ErrorField data="This field must be contained at least 3 characters" />
        )}
      </div>

      <div>
        <label htmlFor="name">Concert name: </label>
        <input
          id="name"
          type="text"
          {...register("concertName", { required: true, minLength: 3 })}
        />
        {errors.voiceType && errors.voiceType.type === "required" && (
          <ErrorField data="Enter the concert name" />
        )}
        {errors.voiceType && errors.voiceType.type === "minLength" && (
          <ErrorField data="This field must be contained at least 3 characters" />
        )}
      </div>

      <div>
        <label htmlFor="composer">Composer: </label>
        <input
          id="composer"
          type="text"
          {...register("composer", { required: true, minLength: 3 })}
        />
        {errors.composer && errors.composer.type === "required" && (
          <ErrorField data="Enter the composer" />
        )}
        {errors.composer && errors.composer.type === "minLength" && (
          <ErrorField data="This field must be contained at least 3 characters" />
        )}
      </div>
      <button type="submit">Add concert</button>
      {isSuccessfully && <div className={styles.success}>The concert is successfully added</div>}
    </form>
  );
};
