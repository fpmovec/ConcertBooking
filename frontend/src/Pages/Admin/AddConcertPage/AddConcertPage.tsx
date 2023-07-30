import { useState } from "react";
import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import styles from "./AddConcertPage.module.css";
import { useForm } from "react-hook-form";
import { concerts } from "../../../Models/MockData";
import { ClassicProps } from "./ClassicProps";
import { OpenAitProps } from "./OpenAirProps";
import { PartyProps } from "./PartyProps";
import { ConcertCoordinates } from "../../../Models/MockData";

type FormData = {
  performer: string;
  ticketsCount: number;
  concertDate: Date;
  location: string;
  concertType: string;
  price: number;
  longitude: number;
  latitude: number;
};

export const AddConcertPage = () => {
  const [selectedType, setSelectedType] = useState("Classic");
  const isRadioSelected = (value: string): boolean => selectedType === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedType(e.target.value);
  };
  const getCurrentConcertId = () => Math.max(...concerts.map((c) => c.Id)) + 1;
  const currentConcertId = getCurrentConcertId();
  const [isContinue, setIsContinue] = useState(false);
  const [currentId, setCurrentId] = useState(currentConcertId);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const submitForm = (data: FormData) => {
    setCurrentId(Math.max(...concerts.map((c) => c.Id)) + 1);
    concerts.push({
      Id: currentId,
      performer: data.performer,
      ticketsCount: data.ticketsCount,
      concertDate: data.concertDate.toString(),
      location: data.location,
      concertType: selectedType,
      price: data.price,
    });
    ConcertCoordinates.push({
      concertId: currentId,
      longitude: data.longitude,
      latitude: data.latitude,
    });
    setIsContinue(true);
    console.log(concerts);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Add a concert</div>
      <div className={styles.block}>
        <form
          className={styles.form}
          onSubmit={(event) => void handleSubmit(submitForm)(event)}
        >
          <div>
            <label htmlFor="performer">Performer: </label>
            <input
              id="performer"
              type="text"
              {...register("performer", { required: true, minLength: 3 })}
            />
            {errors.performer && errors.performer.type === "required" && (
              <ErrorField data="Enter the performer" />
            )}
            {errors.performer && errors.performer.type === "minLength" && (
              <ErrorField data="This field must be contained at least 3 characters" />
            )}
          </div>

          <div>
            <label htmlFor="date">Concert date: </label>
            <input
              id="date"
              type="datetime-local"
              {...register("concertDate", { required: true })}
            />
            {errors.concertDate && errors.concertDate.type === "required" && (
              <ErrorField data="Enter the date of the concert" />
            )}
          </div>

          <div>
            <label htmlFor="location">Location: </label>
            <input
              id="location"
              type="text"
              {...register("location", { required: true, minLength: 5 })}
            />
            {errors.location && errors.location.type === "required" && (
              <ErrorField data="Enter the location of the concert" />
            )}
            {errors.location && errors.location.type === "minLength" && (
              <ErrorField data="This field must be contained at least 5 characters" />
            )}
          </div>

          <div>
            <label htmlFor="price">Price, $: </label>
            <input
              id="price"
              type="number"
              {...register("price", { required: true, min: 3 })}
            />
            {errors.price && errors.price.type === "required" && (
              <ErrorField data="Enter the ticket price" />
            )}
            {errors.price && errors.price.type === "min" && (
              <ErrorField data="The cost cannot be less than 3$" />
            )}
          </div>

          <div>
            <label htmlFor="quantity">Ticket quantity: </label>
            <input
              id="quantity"
              type="number"
              defaultValue={10}
              {...register("ticketsCount", { required: true, min: 5 })}
            />
            {errors.ticketsCount && errors.ticketsCount.type === "required" && (
              <ErrorField data="Enter the ticket quantity of the concert" />
            )}
            {errors.ticketsCount && errors.ticketsCount.type === "min" && (
              <ErrorField data="The number of tickets must be more than 5" />
            )}
          </div>
          <div>
            <fieldset className={styles.coordFieldset}>
              <legend>Coordinates</legend>
              <div>
                <label htmlFor="long">Longitude: </label>
                <input
                  id="long"
                  type="number"
                  {...register("longitude", { required: true })}
                  defaultValue={53.902284}
                />
              </div>
              <div>
                <label htmlFor="lat">Latitude: </label>
                <input
                  id="lat"
                  type="number"
                  {...register("latitude", { required: true })}
                  defaultValue={27.561831}
                />
              </div>
            </fieldset>
          </div>
          <div>
            <div className={styles.checkType}>
              <fieldset>
                <legend>Concert type</legend>
                <div>
                  <div className={styles.radio}>
                    <p>
                      <input
                        type="radio"
                        value="Classic"
                        checked={isRadioSelected("Classic")}
                        onChange={handleRadioClick}
                        id="r1"
                      />
                      Classic
                    </p>
                  </div>
                  <div className={styles.radio}>
                    <p>
                      <input
                        type="radio"
                        value="Party"
                        checked={isRadioSelected("Party")}
                        onChange={handleRadioClick}
                      />
                      Party
                    </p>
                  </div>
                  <div className={styles.radio}>
                    <p>
                      <input
                        type="radio"
                        value="OpenAir"
                        checked={isRadioSelected("OpenAir")}
                        onChange={handleRadioClick}
                      />
                      <span>OpenAir</span>
                    </p>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <button type="submit">Continue</button>
        </form>
        <div>
          {isContinue ? (
            <div>
              {selectedType === "Classic" && (
                <ClassicProps concertId={currentId} />
              )}
              {selectedType === "Party" && <PartyProps concertId={currentId} />}
              {selectedType === "OpenAir" && (
                <OpenAitProps concertId={currentId} />
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
