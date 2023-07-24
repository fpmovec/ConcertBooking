
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
    <Link to={`/concerts/${data.concertId}`} className={styles.title}>
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
        to={`/concerts/${data.concertId}`}
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
      <Link to={`/concerts/${data.concertId}`} className={styles.title}>
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

