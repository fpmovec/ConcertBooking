import React from "react";
import { useForm } from "react-hook-form";
import styles from "./AddConcertPage.module.css";
import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import { Concert } from "../../../Models/ConcertModels";
import { PostParty } from "../../../Requests/POST/ConcertsRequests";
import { useNavigate } from "react-router-dom";

interface Props {
  concert: Concert;
}

type FormData = {
  ageLimit: number;
};

export const PartyProps = ({ concert }: Props) => {
  const [isSuccessfully, setIsSuccessfully] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
  });

  const [ageLim, setAgeLim] = React.useState(0);
  const isRadioSelected = (value: number): boolean => ageLim === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAgeLim(Number(e.target.value));
  };

  const submitForm = async (data: FormData) => {
    await PostParty({
      performer: concert.performer,
      ticketsCount: concert.ticketsCount,
      concertDate: concert.concertDate,
      location: concert.location,
      price: concert.price,
      agelimit: ageLim,
      coordinates: {
        longitude: concert.coordinates.longitude,
        latitude: concert.coordinates.latitude,
      },
    });
    setIsSuccessfully(true);

    navigate("/admin/concerts");
    alert("The concert is successfully added!");
  };

  return (
    <form
      className={styles.form1}
      onSubmit={(e) => void handleSubmit(submitForm)(e)}
    >
      <div className={styles.checkType}>
        <fieldset>
          <legend>Age Limit</legend>
          <div>
            <div className={styles.radio}>
              <p>
                <input
                  type="radio"
                  value="0"
                  checked={isRadioSelected(0)}
                  onChange={handleRadioClick}
                  id="r1"
                />
                0+
              </p>
            </div>
            <div className={styles.radio}>
              <p>
                <input
                  type="radio"
                  value="6"
                  checked={isRadioSelected(6)}
                  onChange={handleRadioClick}
                />
                6+
              </p>
            </div>
            <div className={styles.radio}>
              <p>
                <input
                  type="radio"
                  value="12"
                  checked={isRadioSelected(12)}
                  onChange={handleRadioClick}
                />
                <span>12+</span>
              </p>
            </div>
            <div className={styles.radio}>
              <p>
                <input
                  type="radio"
                  value="16"
                  checked={isRadioSelected(16)}
                  onChange={handleRadioClick}
                />
                <span>16+</span>
              </p>
            </div>
            <div className={styles.radio}>
              <p>
                <input
                  type="radio"
                  value="18"
                  checked={isRadioSelected(18)}
                  onChange={handleRadioClick}
                />
                <span>18+</span>
              </p>
            </div>
          </div>
        </fieldset>
      </div>
      <button type="submit">Add concert</button>
      {isSuccessfully && (
        <div className={styles.success}>The concert is successfully added</div>
      )}
    </form>
  );
};
