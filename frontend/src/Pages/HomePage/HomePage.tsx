/* eslint-disable @typescript-eslint/no-floating-promises */
import { ConcertList } from "../../Components/Concert/ConcertList";
import { useAppSelector, useAppDispatch } from "../../Redux/Hooks";
import { setConcerts } from "../../Redux/Slices";
import { TypeCheckbox } from "../../Components/SortPanel/SortPanel";
import { useState } from "react";
import { GetAllConcerts } from "../../Requests/GET/ConcertsRequests";
import styles from "./HomePage.module.css";
import React from "react";

export interface IConcertType {
  classics: boolean;
  partys: boolean;
  openAirs: boolean;
}

export const HomePage = () => {
  const [concertType, setConcertType] = useState<IConcertType>({
    classics: true,
    partys: true,
    openAirs: true,
  });
  const concerts = useAppSelector((state) => state.concerts.allConcerts);
  const dispatch = useAppDispatch();
  const typeFilter = (arg: string) =>
    concerts.filter((c) => c.concertType === arg);

  React.useEffect(() => {
    const doGetConcerts = async () => {
      const allConcerts = await GetAllConcerts();
      dispatch(setConcerts(allConcerts));
    };
    doGetConcerts();
  }, [concerts.length, dispatch]);

  return (
    <>
      <div className={styles.checkboxes}>
        <TypeCheckbox
          value={concertType.classics}
          label="Classics"
          handleChange={() =>
            setConcertType((prev) => ({ ...prev, classics: !prev.classics }))
          }
        />
        <TypeCheckbox
          value={concertType.partys}
          label="Partys"
          handleChange={() =>
            setConcertType((prev) => ({ ...prev, partys: !prev.partys }))
          }
        />
        <TypeCheckbox
          value={concertType.openAirs}
          label="OpenAirs"
          handleChange={() =>
            setConcertType((prev) => ({ ...prev, openAirs: !prev.openAirs }))
          }
        />
      </div>
      <div>
        {!(
          concertType.classics ||
          concertType.openAirs ||
          concertType.partys
        ) && <div className="notFound">Nothing found 😔</div>}
        {concertType.classics && <ConcertList data={typeFilter("Classic")} />}
        {concertType.partys && <ConcertList data={typeFilter("Party")} />}
        {concertType.openAirs && <ConcertList data={typeFilter("OpenAir")} />}
      </div>
    </>
  );
};
