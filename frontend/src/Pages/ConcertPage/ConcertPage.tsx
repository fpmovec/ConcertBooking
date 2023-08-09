import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { gettingConcert, gotConcert } from "../../Redux/Slices";
import { ConcertInfo } from "./ConcertInfo";
import {
  GetConcertById,
  //GetCoordinatesByConcertId,
} from "../../Requests/GET/ConcertsRequests";

import styles from "./ConcertPage.module.css";
import React from "react";
import { NotFound } from "../NotFoundPage/NotFoundPage";

export const ConcertPage = () => {
  const dispath = useAppDispatch();
  const concert = useAppSelector((state) => state.concerts.viewing);
  const loading = useAppSelector((state) => state.concerts.loading);
  //const allConcerts = useAppSelector((state) => state.concerts.allConcerts);

  const { concertId } = useParams();

  React.useEffect(() => {
    const getConcert = async () => {
      dispath(gettingConcert());
      const foundConcert = await GetConcertById(Number(concertId));
      dispath(gotConcert(foundConcert));
      //const coordinates = await GetCoordinatesByConcertId(Number(concertId));
      //dispath(gotCoordinates(coordinates));
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getConcert();
  }, [concertId, dispath]);
  if (concert === null) return <NotFound />;
  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className={styles.concertInfo}>
      <ConcertInfo data={concert} />
    </div>
  );
};
