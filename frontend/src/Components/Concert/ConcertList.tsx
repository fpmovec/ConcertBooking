import styles from "./ConcertList.module.css";
import { ClassicConcert, OpenAirConcert, PartyConcert } from "./Concert";
import { Classic, OpenAir, Party } from "../../Models/ConcertModels";

interface PropsP {
  data: Party[];
}

interface PropsO {
  data: OpenAir[];
}

interface PropsC {
  data: Classic[];
}

export const PartysList = ({ data }: PropsP) => {
  return (
    <ul className={styles.ul}>
      {data.map((concert) => (
        <li className={styles.li}>
          <PartyConcert data={concert} />
        </li>
      ))}
    </ul>
  );
};

export const OpenAirsList = ({ data }: PropsO) => {
  return (
    <ul className={styles.ul}>
      {data.map((concert) => (
        <li className={styles.li}>
          <OpenAirConcert data={concert} />
        </li>
      ))}
    </ul>
  );
};

export const ClassicsList = ({ data }: PropsC) => {
  return (
    <ul className={styles.ul}>
      {data.map((concert) => (
        <li className={styles.li}>
          <ClassicConcert data={concert} />
        </li>
      ))}
    </ul>
  );
};
