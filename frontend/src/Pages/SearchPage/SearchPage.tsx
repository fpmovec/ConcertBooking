import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { ConcertList } from "../../Components/Concert/ConcertList";
import { searchingConcerts, searchedConcerts } from "../../Redux/Slices";
import { getConcertsByCriteria } from "../../Models/ConcertFunctions";
import styles from './SearchPage.module.css'

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const dispath = useAppDispatch();
  const criteria = searchParams.get("criteria");
  const concerts = useAppSelector((state) => state.concerts.searching);

  const isSearched = useRef(true);

  React.useEffect(() => {
    dispath(searchingConcerts());
    const foundConcerts = getConcertsByCriteria(criteria);
    isSearched.current = foundConcerts.length === 0 ? false : true;
    dispath(searchedConcerts(foundConcerts));
  }, [criteria, dispath]);

  return isSearched.current ? (
    <ConcertList data={concerts} />
  ) : (
    <div className={styles.notFound}>Nothing found 😔</div>
  );
};
