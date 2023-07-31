import { PurchasedComponent } from "../../Components/Booking/PurchasedComponent";
import { getConcert } from "../../Models/ConcertFunctions";
import { useAppSelector } from "../../Redux/Hooks";
import styles from './Purchased.module.css'

export const PurchasedPage = () => {
    const purchasedTickets = useAppSelector((state) => state.concerts.purchased);
  console.log(purchasedTickets);
  return purchasedTickets.length === 0 ? (
    <div className="notFound">You haven't purchased any tickets yet 🙄</div>
  ) : (
    <ul className={styles.ul}>
      {purchasedTickets.map((b) => (
        <li className={styles.li} key={b.id}>
          <PurchasedComponent
            booking={b}
            concertPerformer={getConcert(b.concertId)?.performer}
          />
        </li>
      ))}
    </ul>
  );
}