import { useForm } from "react-hook-form";
import styles from "./AddConcertPage.module.css";
import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import { useState } from "react";
import { Concert } from "../../../Models/ConcertModels";
import { PostClassic } from "../../../Requests/POST/ConcertsRequests";
import { useNavigate } from "react-router-dom";

interface Props {
  concert: Concert;
}

type FormData = {
  voiceType: string;
  concertName: string;
  composer: string;
};

export const ClassicProps = ({ concert }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

const navigate = useNavigate();

  const [voiceType, setVoiceType] = useState("Tenor");
  const isRadioSelected = (value: string): boolean => voiceType === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVoiceType(e.target.value);
  };

  const [isSuccessfully, setIsSuccessfully] = useState(false);

  const submitForm = async (data: FormData) => {
    console.log(concert);
    await PostClassic({
      performer: concert.performer,
      ticketsCount: concert.ticketsCount,
      concertDate: concert.concertDate,
      location: concert.location,
      price: concert.price,
      voiceType: voiceType,
      concertName: data.concertName,
      composer: data.composer,
      coordinates: {
        latitude: concert.coordinates.latitude,
        longitude: concert.coordinates.longitude,
      },
    });
    setIsSuccessfully(true);
    navigate("/admin/concerts");
  };

  return (
    <form
      className={styles.form1}
      style={{marginRight: 10}}
      onSubmit={(e) => void handleSubmit(submitForm)(e)}
    >
      <div className={styles.checkType}>
              <fieldset>
                <legend>Voice type</legend>
                <div>
                  <div className={styles.radio}>
                    <p>
                      <input
                        type="radio"
                        value="Tenor"
                        checked={isRadioSelected("Tenor")}
                        onChange={handleRadioClick}
                        id="r1"
                      />
                      Tenor
                    </p>
                  </div>
                  <div className={styles.radio}>
                    <p>
                      <input
                        type="radio"
                        value="Bass"
                        checked={isRadioSelected("Bass")}
                        onChange={handleRadioClick}
                      />
                      Bass
                    </p>
                  </div>
                  <div className={styles.radio}>
                    <p>
                      <input
                        type="radio"
                        value="Baritone"
                        checked={isRadioSelected("Baritone")}
                        onChange={handleRadioClick}
                      />
                      <span>Baritone</span>
                    </p>
                  </div>
                </div>
              </fieldset>
            </div>

      <div>
        <label htmlFor="name">Concert name: </label>
        <input
          id="name"
          type="text"
          {...register("concertName", { required: true, minLength: 3 })}
        />
        {errors.concertName && errors.concertName.type === "required" && (
          <ErrorField data="Enter the name" />
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
      {isSuccessfully && (
        <div className={styles.success}>The concert is successfully added</div>
      )}
    </form>
  );
};
