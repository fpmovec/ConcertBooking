/* eslint-disable @typescript-eslint/no-floating-promises */
import { useAppSelector, useAppDispatch } from "../../../Redux/Hooks";
import { ConcertComponent } from "./ConcertComponent";
import { GetAllConcerts } from "../../../Requests/GET/ConcertsRequests";
import styles from "./ConcertsPage.module.css";
import React from "react";
import { setConcerts } from "../../../Redux/Slices";

export const ConcertsPage = () => {
  const dispatch = useAppDispatch();
  const concerts = useAppSelector((state) => state.concerts.allConcerts);
  React.useEffect(() => {
    const doGet = async () => {
      const allConcerts = await GetAllConcerts();
      dispatch(setConcerts(allConcerts));
    };
        doGet();
  }, [concerts.length, dispatch]);

  return (
    <div>
      <ul className={styles.ul}>
      {concerts.map((b) => (
        <li className={styles.li} key={b.id}>
          <ConcertComponent concert={b} />
        </li>
      ))}
    </ul>
    </div>
    
  );
};
