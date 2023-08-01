import { useAppSelector } from "../../Redux/Hooks";
import { GetConcert } from "../../Models/ConcertFunctions";
import { BookingComponent } from "../../Components/Booking/BookingComponent";
import styles from "./BookedPage.module.css";

export const BookedPage = () => {
  const allConcerts = useAppSelector(state => state.concerts.allConcerts)
  const bookedTickets = useAppSelector((state) => state.concerts.booking);
  console.log(bookedTickets);
  return bookedTickets.length === 0 ? (
    <div className="notFound">You haven't booked any tickets yet 🙄</div>
  ) : (
    <ul className={styles.ul}>
      {bookedTickets.map((b) => (
        <li className={styles.li} key={b.id}>
          <BookingComponent
            booking={b}
            concertPerformer={GetConcert(b.concertId, allConcerts)?.performer}
          />
        </li>
      ))}
    </ul>
  );
};
