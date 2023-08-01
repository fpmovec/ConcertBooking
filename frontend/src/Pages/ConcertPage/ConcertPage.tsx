import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { gettingConcert, gotConcert } from "../../Redux/Slices";
import { ConcertInfo } from "./ConcertInfo";
import { GetConcert } from "../../Models/ConcertFunctions";
import styles from "./ConcertPage.module.css";
import React from "react";

export const ConcertPage = () => {
  const dispath = useAppDispatch();
  const concert = useAppSelector((state) => state.concerts.viewing);
  const loading = useAppSelector((state) => state.concerts.loading);
  const allConcerts = useAppSelector((state) => state.concerts.allConcerts)

  const { concertId } = useParams();

  React.useEffect(() => {
    dispath(gettingConcert());
    const foundConcert = GetConcert(Number(concertId), allConcerts);
    dispath(gotConcert(foundConcert));
  }, [allConcerts, concertId, dispath]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className={styles.concertInfo}>
      <ConcertInfo data={concert} />
    </div>
  );
};
