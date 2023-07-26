import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { gettingConcert, gotConcert } from "../../Redux/Slices";
import { ConcertInfo } from "./ConcertInfo";
import { getConcert } from "../../Models/ConcertFunctions";
import styles from './ConcertPage.module.css'
import React from "react";

export const ConcertPage = () => {
  const dispath = useAppDispatch();
  const concert = useAppSelector((state) => state.concerts.viewing);
  const loading = useAppSelector((state) => state.concerts.loading);

  const { concertId } = useParams();

  React.useEffect(() => {
    dispath(gettingConcert());
    const foundConcert = getConcert(Number(concertId));
    dispath(gotConcert(foundConcert));
  }, [concertId, dispath]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className={styles.concertInfo}>
      <ConcertInfo data={concert}/>
    </div>
  );
};
