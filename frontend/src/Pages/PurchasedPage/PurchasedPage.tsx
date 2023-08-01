import { PurchasedComponent } from "../../Components/Booking/PurchasedComponent";
import { GetConcert } from "../../Models/ConcertFunctions";
import { useAppSelector } from "../../Redux/Hooks";
import styles from "./Purchased.module.css";

export const PurchasedPage = () => {
  const purchasedTickets = useAppSelector((state) => state.concerts.purchased);
  const concerts = useAppSelector(state => state.concerts.allConcerts)
  console.log(purchasedTickets);
  return purchasedTickets.length === 0 ? (
    <div className="notFound">You haven't purchased any tickets yet 🙄</div>
  ) : (
    <ul className={styles.ul}>
      {purchasedTickets.map((b) => (
        <li className={styles.li} key={b.id}>
          <PurchasedComponent
            booking={b}
            concertPerformer={GetConcert(b.concertId, concerts)?.performer}
          />
        </li>
      ))}
    </ul>
  );
};
