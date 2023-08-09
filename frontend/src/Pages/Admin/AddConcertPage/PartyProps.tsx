import React from "react";
import { useForm } from "react-hook-form";
//import { useAppDispatch } from "../../../Redux/Hooks";
import styles from "./AddConcertPage.module.css";
import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import { Concert } from "../../../Models/ConcertModels";
import { PostParty } from "../../../Requests/POST/ConcertsRequests";
//import { addParty } from "../../../Redux/Slices";

interface Props {
  concert: Concert;
}

type FormData = {
  ageLimit: number;
};

export const PartyProps = ({ concert }: Props) => {
  //const dispatch = useAppDispatch();
  const [isSuccessfully, setIsSuccessfully] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const submitForm = async (data: FormData) => {
    await PostParty(
      {
        performer: concert.performer,
        ticketsCount: concert.ticketsCount,
        concertDate: concert.concertDate,
        location: concert.location,
        price: concert.price,
        agelimit: data.ageLimit,
        coordinates: {
          longitude: concert.coordinates.longitude,
          latitude: concert.coordinates.latitude
        }
      },
     
    );
    setIsSuccessfully(true);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => void handleSubmit(submitForm)(e)}
    >
      <div>
        <label htmlFor="age">Age limit: </label>
        <input
          id="age"
          type="number"
          {...register("ageLimit", { required: true, min: 3 })}
        />
        {errors.ageLimit && errors.ageLimit.type === "required" && (
          <ErrorField data="Enter the voice type" />
        )}
        {errors.ageLimit && errors.ageLimit.type === "min" && (
          <ErrorField data="The age limit cannot be less than 3" />
        )}
      </div>
      <button type="submit">Add concert</button>
      {isSuccessfully && (
        <div className={styles.success}>The concert is successfully added</div>
      )}
    </form>
  );
};
