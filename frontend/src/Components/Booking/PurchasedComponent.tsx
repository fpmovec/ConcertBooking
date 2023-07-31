import { Link } from "react-router-dom";
import { Booking } from "../../Models/BookingModels";
import { Currency } from "../Currency/Currency";
import styles from './BookingComponent.module.css'

interface Props {
    booking: Booking;
    concertPerformer: string | undefined;
  }

export const PurchasedComponent = ({ booking, concertPerformer}: Props) => {
    return (
        <div className={styles.booking}>
          <div className={styles.title}>
            <div>Purchase Id: {booking.id}</div>
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
          </div>
        </div>
      );
}