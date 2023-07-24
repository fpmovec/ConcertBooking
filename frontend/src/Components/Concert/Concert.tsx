
import { Classic, OpenAir, Party } from "../../Models/ConcertModels";
import { Link } from "react-router-dom";
import styles from "./ConcertList.module.css";

interface PropsC {
  data: Classic;
}

interface PropsO {
  data: OpenAir;
}

interface PropsP {
  data: Party;
}

export const ClassicConcert = ({ data }: PropsC) => (
  <div className={styles.concert}>
  <div>
    <Link to={`/concerts/classics/${data.concertId}`} className={styles.title}>
      {data.performer}
    </Link>
    <div className={styles.description}>
      {data.location}
      <br />
      {data.concertDate.toString()}
      <br/>
        Type: {data.concertType}
    </div>
  </div>
  <div>
    <button>Buy ticket</button>
    <br />
    <small>Tickets left: {data.ticketsCount}</small>
  </div>
</div>
);

export const OpenAirConcert = ({ data }: PropsO) => (
  <div className={styles.concert}>
    <div>
      <Link
        to={`/concerts/openAirs/${data.concertId}`}
        className={styles.title}
      >
        {data.performer}
      </Link>
      <div className={styles.description}>
        {data.location}
        <br />
        {data.concertDate.toString()}
        <br/>
        Type: {data.concertType}
      </div>
    </div>
    <div>
      <button>Buy ticket</button>
      <br />
      <small>Tickets left: {data.ticketsCount}</small>
    </div>
  </div>
);

export const PartyConcert = ({ data }: PropsP) => (
  <div className={styles.concert}>
    <div>
      <Link to={`/concerts/partys/${data.concertId}`} className={styles.title}>
        {data.performer}
      </Link>
      <div className={styles.description}>
        {data.location}
        <br />
        {data.concertDate.toString()}
        <br/>
        Type: {data.concertType}
      </div>
    </div>
    <div>
      <button>Buy ticket</button>
      <br />
      <small>Tickets left: {data.ticketsCount}</small>
    </div>
  </div>
);

/*interface Props<TConcert> {
  data: TConcert;
}

function Concert({ data }: Props<Classic | Party | OpenAir>) {
  return (
    <>
      <Link to={`/concerts/${data.concertId}`}>{data.performer}</Link>
    </>
  );
}

const Pr: Props<Classic | Party | OpenAir> = {
  data: {
    concertId: 6,
    performer: "performer2",
    ticketsCount: 20,
    concertDate: new Date("2023-10-10T17:00"),
    location: "Minsk",
    concertType: "classic",
    voiceType: "type2",
    concertName: "name2",
    composer: "composer2",
  },
};
*/
