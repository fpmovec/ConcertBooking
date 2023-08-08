import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { ConcertList } from "../../Components/Concert/ConcertList";
import { searchingConcerts, searchedConcerts } from "../../Redux/Slices";
import { GetConcertsByCriteria } from "../../Requests/GET/ConcertsRequests";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const dispath = useAppDispatch();
  const criteria = searchParams.get("criteria");
  const concerts = useAppSelector((state) => state.concerts.searching);
  const allConcerts = useAppSelector((state) => state.concerts.allConcerts);

  const isSearched = useRef(true);

  React.useEffect(() => {
    const getSearch = async () => {
      dispath(searchingConcerts());
      const foundConcerts = await GetConcertsByCriteria(criteria);
      isSearched.current = foundConcerts.length === 0 ? false : true;
      dispath(searchedConcerts(foundConcerts));
    };
    void getSearch();
  }, [allConcerts, criteria, dispath]);

  return isSearched.current ? (
    <ConcertList data={concerts} />
  ) : (
    <div className={styles.notFound}>Nothing found 😔</div>
  );
};
