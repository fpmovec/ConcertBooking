import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { gettingConcert, gotConcert } from "../../Redux/Slices";
import { getConcert } from "../../Models/MockData";
import React from "react";

export const ConcertPage = () => {
  const dispath = useAppDispatch();
  const concert = useAppSelector((state) => state.concerts.viewing);
const loading = useAppSelector((state) => state.concerts.loading);

  const {concertId} = useParams();

  React.useEffect(() => {
    dispath(gettingConcert());
    const concert = getConcert(Number(concertId));
   dispath(gotConcert(concert));
  }, [concertId]);
  return (loading ? <h2>Loading...</h2> : <h2>Concert with id {concertId} and {concert?.concertType} type</h2>);
};
