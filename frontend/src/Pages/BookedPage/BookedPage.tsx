import { useAppSelector, useAppDispatch } from "../../Redux/Hooks";
import { GetConcert } from "../../Models/ConcertFunctions";
import { BookingComponent } from "../../Components/Booking/BookingComponent";
import { useAuth } from "../../Authorization/Auth";
import { setBookings } from "../../Redux/Slices";
import styles from "./BookedPage.module.css";
import React from 'react';
import { GetAllBookingsByEmail } from "../../Requests/GET/BookingsRequests";

export const BookedPage = () => {
  const { user } = useAuth();
  const allConcerts = useAppSelector(state => state.concerts.allConcerts)
  const bookedTickets = useAppSelector((state) => state.concerts.booking);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const doGet = async () => {
      const bookings = await GetAllBookingsByEmail(user!.email);
      dispatch(setBookings(bookings));
    }
    void doGet();
  }, [dispatch, user]);

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
