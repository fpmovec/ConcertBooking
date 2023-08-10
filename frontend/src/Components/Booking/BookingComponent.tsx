import { Booking } from "../../Models/BookingModels";
import { Currency } from "../Currency/Currency";
import styles from "./BookingComponent.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/Hooks";
import { setBookings } from "../../Redux/Slices";
import { DeleteBooking } from "../../Requests/DELETE/BookingsRequests";
import { useAuth } from "../../Authorization/Auth";
import { GetAllBookingsByEmail } from "../../Requests/GET/BookingsRequests";

interface Props {
  booking: Booking;
  concertPerformer: string | undefined;
}

export const BookingComponent = ({ booking, concertPerformer }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    const remove = async () => {
      await DeleteBooking(booking.id);
      const bookings = await GetAllBookingsByEmail(user!.email);
      dispatch(setBookings(bookings));
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    remove();
  };

  const payClick = () => navigate(`/pay/${booking.id}`);

  return (
    <div className={styles.booking}>
      <div className={styles.title}>
        <div>Booking Id: {booking.id}</div>
        <div>
          <span style={{ fontWeight: 200 }}>Total price: </span>{" "}
          <Currency currency={booking.purchaseAmount} />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.description}>
          <div>
            ➡️ Performer:{" "}
            <span>
              <Link
                className={styles.link}
                to={`/concerts/${booking.concertId}`}
              >
                {concertPerformer}
              </Link>
            </span>
            <br />
            📛 Name: {booking.firstName} {booking.lastName}
          </div>
          <div>
            📧 Email: {booking.email}
            <br />
            🎫 Ticket quantity: {booking.ticketQuantity}
          </div>
        </div>

        <div className={styles.buttonsBlock}>
          <div>
            <button onClick={payClick} className={styles.remove}>
              💸 Pay
            </button>
          </div>
          <button onClick={handleClick} className={styles.remove}>
            🗑️ Remove
          </button>
        </div>
      </div>
    </div>
  );
};
