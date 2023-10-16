import styles from "./ConcertList.module.css";
import { ConcertComponent } from "./Concert";
import { Concert } from "../../Models/ConcertModels";

interface Props {
  data: Concert[];
}

export const ConcertList = ({ data }: Props) => {
  return data.length > 0 ? (
    <ul className={styles.ul}>
      {data.map((concert) => (
        <li className={styles.li} key={concert.id}>
          <ConcertComponent data-testid="concert-1" data={concert} />
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
};
