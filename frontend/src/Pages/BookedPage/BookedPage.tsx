import { useAppSelector } from "../../Redux/Hooks";
import { GetConcert } from "../../Models/ConcertFunctions";
import { BookingComponent } from "../../Components/Booking/BookingComponent";
import { useAuth } from "../../Authorization/Auth";
import styles from "./BookedPage.module.css";

export const BookedPage = () => {
  const { user } = useAuth();
  const allConcerts = useAppSelector(state => state.concerts.allConcerts)
  const bookedTickets = useAppSelector((state) => state.concerts.booking);
  const userTickets = bookedTickets.filter(b => b.username === user!.name);
  return userTickets.length === 0 ? (
    <div className="notFound">You haven't booked any tickets yet 🙄</div>
  ) : (
    <ul className={styles.ul}>
      {userTickets.map((b) => (
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
