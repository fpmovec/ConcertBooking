import { useAppSelector } from "../../../Redux/Hooks";
import { ConcertComponent } from "./ConcertComponent";
import styles from "./ConcertsPage.module.css";

export const ConcertsPage = () => {
  const concerts = useAppSelector((state) => state.concerts.allConcerts);
  return (
    <ul className={styles.ul}>
      {concerts.map((b) => (
        <li className={styles.li} key={b.Id}>
          <ConcertComponent concert={b} />
        </li>
      ))}
    </ul>
  );
};
