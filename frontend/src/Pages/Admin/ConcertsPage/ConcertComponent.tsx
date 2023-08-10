import { Link } from "react-router-dom";
import { Currency } from "../../../Components/Currency/Currency";
import { Concert } from "../../../Models/ConcertModels";
import { useAppDispatch } from "../../../Redux/Hooks";
import { setConcerts } from "../../../Redux/Slices";
import styles from "./ConcertsPage.module.css";
import { DeleteConcert } from "../../../Requests/DELETE/ConcertsDelete";
import { GetAllConcerts } from "../../../Requests/GET/ConcertsRequests";

interface Props {
  concert: Concert;
}

export const ConcertComponent = ({ concert }: Props) => {
  const dispath = useAppDispatch();

  const handleClick = () => {
    const remove = async () => {
      await DeleteConcert(concert.id);
      const allConcerts = await GetAllConcerts();
      dispath(setConcerts(allConcerts));
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    remove();
  };

  return (
    <div className={styles.concert}>
      <div>
        <Link to={`/concerts/${concert.id}`} className={styles.title}>
          {concert.performer}
        </Link>
        <div className={styles.description}>
          🌆 Location: {concert.location}
          <br />
          📆 Date: {concert.concertDate}
          <br />
          🎭 Type: {concert.concertType}
          <br />
          🎫 Ticket price: <Currency currency={concert.price} />
        </div>
      </div>
      <div>
        <button onClick={handleClick} className={styles.remove}>
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};
