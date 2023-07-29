import { Booking } from "../../Models/BookingModels";
import { Currency } from "../Currency/Currency";
import styles from "./BookingComponent.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { DeleteElement } from "../../Models/ConcertFunctions";
import { setBookings } from "../../Redux/Slices";
import React from "react";

interface Props {
  booking: Booking;
  concertPerformer: string | undefined;
}

export const BookingComponent = ({ booking, concertPerformer }: Props) => {
  const dispatch = useAppDispatch();
  const allBookings = useAppSelector((state) => state.concerts.booking);
  let currentBookings = allBookings;
  const navigate = useNavigate();

  const handleClick = () => {
    currentBookings = DeleteElement(booking, allBookings);
    dispatch(setBookings(currentBookings));
  };

  const payClick = () => navigate(`/pay/${booking.id}`)

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
            <button onClick={payClick} className={styles.remove}>💸 Pay</button>
          </div>
          <button onClick={handleClick} className={styles.remove}>
            🗑️ Remove
          </button>
        </div>
      </div>
    </div>
  );
};
