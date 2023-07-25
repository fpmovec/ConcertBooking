import styles from "./ConcertList.module.css";
import { ConcertComponent } from "./Concert";
import { Concert } from "../../Models/ConcertModels";

interface Props {
  data: Concert[];
}

export const ConcertList = ({ data }: Props) => {
  return (
    <ul className={styles.ul}>
      {data.map((concert) => (
        <li className={styles.li} key={concert.Id}>
          <ConcertComponent data={concert}/>
        </li>
      ))}
    </ul>
  );
}

