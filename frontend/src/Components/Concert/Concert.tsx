
import { Concert } from "../../Models/ConcertModels";
import { Link } from "react-router-dom";
import styles from "./ConcertList.module.css";

interface Props {
  data: Concert;
}

export const ConcertComponent = ({ data } : Props) => (
  <div className={styles.concert}>
    <div>
      <Link to={`/concerts/${data.Id}`} className={styles.title}>
        {data.performer}
      </Link>
      <div className={styles.description}>
        {data.location}
        <br />
        {data.concertDate}
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
)

