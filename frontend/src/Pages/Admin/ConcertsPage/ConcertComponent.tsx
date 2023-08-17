import { Link } from "react-router-dom";
import { Currency } from "../../../Components/Currency/Currency";
import { Concert } from "../../../Models/ConcertModels";
import { useAppDispatch } from "../../../Redux/Hooks";
import { setConcerts } from "../../../Redux/Slices";
import styles from "./ConcertsPage.module.css";
import { DeleteConcert } from "../../../Requests/DELETE/ConcertsDelete";
import { GetAllConcerts } from "../../../Requests/GET/ConcertsRequests";
import React from "react";
import { Modal } from "../../../Components/Modal/Modal";

interface Props {
  concert: Concert;
}

export const ConcertComponent = ({ concert }: Props) => {
  const dispath = useAppDispatch();
  const [modalActive, setModalActive] = React.useState(false);
  const handleClick = () => {
    const remove = async () => {
      await DeleteConcert(concert.id);
      const allConcerts = await GetAllConcerts();
      dispath(setConcerts(allConcerts));
      alert("Concert is successfully deleted!");
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
        <button onClick={() => setModalActive(true)} className={styles.remove}>
          🗑️ Remove
        </button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={styles.modalBlock}>
          <div>Are you sure you want to delete the concert?</div>
          <div className={styles.buttonsBlock}>
            <button onClick={() => setModalActive(false)}>No</button>
            <button
              onClick={() => {
                handleClick();
                setModalActive(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
