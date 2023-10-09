import { useForm } from "react-hook-form";
import styles from "./AddConcertPage.module.css";
import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import { useState } from "react";
import { Concert } from "../../../Models/ConcertModels";
import { PostOpenAir } from "../../../Requests/POST/ConcertsRequests";
import { useNavigate } from "react-router-dom";

interface Props {
  concert: Concert;
}

type FormData = {
  headliner: string;
  journey: string;
};

export const OpenAitProps = ({ concert }: Props) => {
  const [isSuccessfully, setIsSuccesfully] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
  });

  const submitForm = async (data: FormData) => {
    setIsButtonDisabled(true)
    await PostOpenAir(
      {
        performer: concert.performer,
        ticketsCount: concert.ticketsCount,
        concertDate: concert.concertDate,
        location: concert.location,
        price: concert.price,
        headliner: data.headliner,
        journey: data.journey,
        coordinates: {
          longitude: concert.coordinates.longitude,
          latitude: concert.coordinates.latitude
        }
      },
    );
    setIsSuccesfully(true);
    navigate("/admin/concerts");
    alert("The concert is successfully added!");
  };

  return (
    <form
      className={styles.form1}
      onSubmit={(e) => void handleSubmit(submitForm)(e)}
    >
      <div>
        <label htmlFor="head">Headliner: </label>
        <input
          id="head"
          type="text"
          {...register("headliner", { required: true, minLength: 3 })}
        />
        <br/>
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
        <br/>
        {errors.journey && errors.journey.type === "required" && (
          <ErrorField data="Enter the journey" />
        )}
        {errors.journey && errors.journey.type === "minLength" && (
          <ErrorField data="This field must be contained at least 5 characters" />
        )}
      </div>
      <button disabled={isButtonDisabled} type="submit">Add concert</button>
      {isSuccessfully && (
        <div className={styles.success}>The concert is successfully added</div>
      )}
    </form>
  );
};
