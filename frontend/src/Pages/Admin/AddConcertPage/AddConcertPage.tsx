import { useState } from "react";
import { ErrorField } from "../../../Components/SuccesErrorFields/ErrorField";
import styles from "./AddConcertPage.module.css";
import { useForm } from "react-hook-form";
//import { useAppSelector } from "../../../Redux/Hooks";
import { ClassicProps } from "./ClassicProps";
import { OpenAitProps } from "./OpenAirProps";
import { PartyProps } from "./PartyProps";
import { Concert } from "../../../Models/ConcertModels";
import React from "react";
import { MapComponent } from "./Map/Map";
import { useAppSelector, useAppDispatch } from "../../../Redux/Hooks";
import { setLocation } from "../../../Redux/Slices";
import { MyGlobalContext } from "../../../Redux/Hooks";

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
  const dispatch = useAppDispatch();
  //const location = useAppSelector((state) => state.concerts.location);
  //const [location, setLoc] = React.useState<string>("Минск");
  const [selectedType, setSelectedType] = useState("Classic");
  const isRadioSelected = (value: string): boolean => selectedType === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedType(e.target.value);
  };
  const concerts = useAppSelector((state) => state.concerts.allConcerts);
  const [coord, setCoord] = React.useState<number[]>([53.889571, 27.574776]);
  const [location, setLocation] = React.useState<string>(
    "Минск, ул. Октябрьская, 16"
  );
  //const coordinates = useAppSelector((state) => state.concerts.coord);
  const [isContinue, setIsContinue] = useState(false);
  const [concert, setConcert] = useState<Concert>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const IsUnique = (name: string): boolean => {
    return concerts.some((c) => c.performer === name);
  };

  const submitForm = (data: FormData) => {
    const conc: Concert = {
      id: 0,
      performer: data.performer,
      ticketsCount: data.ticketsCount,
      concertDate: data.concertDate.toString(),
      location: location,
      concertType: selectedType,
      price: data.price,
      coordinates: {
        longitude: coord[0],
        latitude: coord[1],
      },
    };
    console.log(conc);
    setConcert(conc);
    setIsContinue(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Add a concert</div>
      <div className={styles.column}>
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
                {...register("performer", {
                  required: true,
                  minLength: 3,
                  validate: {
                    isUnique: (n) => IsUnique(n) === false,
                  },
                })}
              />
<br />
              {errors.performer && errors.performer.type === "required" && (
                <ErrorField data="Enter the performer" />
              )}
              {errors.performer && errors.performer.type === "minLength" && (
                <ErrorField data="This field must be contained at least 3 characters" />
              )}
              {errors.performer && errors.performer.type === "isUnique" && (
                <ErrorField data="The performer must be unique" />
              )}
            </div>

            <div>
              <label htmlFor="date">Concert date: </label>
              <input
                id="date"
                type="datetime-local"
                {...register("concertDate", { required: true })}
              />
              <br/>
              {errors.concertDate && errors.concertDate.type === "required" && (
                <ErrorField data="Enter the date of the concert" />
              )}
            </div>

            {/* <div>
            <label htmlFor="location">Location: </label>
            <input
              id="location"
              type="text"
              {...register("location", {
                required: true,
                minLength: 3,
                validate: {
                  setLoc: (l) => {
                    if (location !== "") setLoc(l);
                    console.log(l);
                    return true;
                  },
                },
              })}
            />
            {errors.location && errors.location.type === "required" && (
              <ErrorField data="Enter the location of the concert" />
            )}
            {errors.location && errors.location.type === "minLength" && (
              <ErrorField data="This field must be contained at least 5 characters" />
            )}
          </div> */}

            <div>
              <label htmlFor="price">Price, $: </label>
              <input
                id="price"
                type="number"
                {...register("price", { required: true, min: 0 })}
              />
              <br/>
              {errors.price && errors.price.type === "required" && (
                <ErrorField data="Enter the ticket price" />
              )}
              {errors.price && errors.price.type === "min" && (
                <div style={{ fontSize: 16 }}>
                  <ErrorField data="The cost cannot be less than 0$" />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="quantity">Ticket quantity: </label>
              <input
                id="quantity"
                type="number"
                defaultValue={10}
                {...register("ticketsCount", { required: true, min: 1 })}
              />
              <br/>
              {errors.ticketsCount &&
                errors.ticketsCount.type === "required" && (
                  <ErrorField data="Enter the ticket quantity of the concert" />
                )}
              {errors.ticketsCount && errors.ticketsCount.type === "min" && (
                <ErrorField data="The number of tickets must be more than 1" />
              )}
            </div>
            <div className={styles.map_block}>
              Select the address of the event
              <div className={styles.map}>
                <MyGlobalContext.Provider
                  value={{
                    coordinates: coord,
                    setCoordinates: setCoord,
                    location: location,
                    setLocation: setLocation,
                  }}
                >
                  <MapComponent />
                </MyGlobalContext.Provider>
              </div>
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
          <div
            style={{
              marginLeft: 65,
            }}
          >
            {isContinue ? (
              <div>
                {selectedType === "Classic" && (
                  <ClassicProps concert={concert!} />
                )}
                {selectedType === "Party" && <PartyProps concert={concert!} />}
                {selectedType === "OpenAir" && (
                  <OpenAitProps concert={concert!} />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
