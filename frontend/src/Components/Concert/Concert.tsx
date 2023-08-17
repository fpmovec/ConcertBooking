import { Concert } from "../../Models/ConcertModels";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Currency } from "../Currency/Currency";
import { useAuth } from "../../Authorization/Auth";
import styles from "./ConcertList.module.css";
import React from "react";
import { Modal } from "../Modal/Modal";
import { isAdmin } from "../../Pages/Admin/AdminList";

interface Props {
  data: Concert;
}

export const ConcertComponent = ({ data }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const [modalActive, setModalActive] = React.useState(false);
  const navigate = useNavigate();
  const navigateToBooking = () => {
    if (isAuthenticated) {
      if (isAdmin(user!.email)) setModalActive(true);
      else navigate(`/booking/${data.id}`);
    } else navigate("/signin");
  };
  return (
    <div className={styles.concert}>
      <div>
        <Link to={`/concerts/${data.id}`} className={styles.title}>
          {data.performer}
        </Link>
        <div className={styles.description}>
          🌆 Location: {data.location}
          <br />
          📆 Date: {data.concertDate}
          <br />
          🎭 Type: {data.concertType}
          <br />
          🎫 Ticket price: <Currency currency={data.price} />
        </div>
      </div>
      <div>
        <button onClick={navigateToBooking}>Book a ticket</button>
        <br />
        <small>Tickets left: {data.ticketsCount}</small>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={styles.modalBlock}>
          <div>Admin can not book tickets</div>
          <div className={styles.buttonsBlock}>
            <button onClick={() => setModalActive(false)}>Ok</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
