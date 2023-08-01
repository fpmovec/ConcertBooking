import { Link } from "react-router-dom";
import { Currency } from "../../../Components/Currency/Currency";
import { Concert } from "../../../Models/ConcertModels";
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks";
import {
  setClassics,
  setConcerts,
  setCoordinates,
  setOpenAirs,
  setPartys,
} from "../../../Redux/Slices";
import styles from "./ConcertsPage.module.css";
import {
  DeleteClassic,
  DeleteConcert,
  DeleteCoordinates,
  DeleteOpenAir,
  DeleteParty,
} from "../../../Models/ConcertFunctions";

interface Props {
  concert: Concert;
}

export const ConcertComponent = ({ concert }: Props) => {
  const dispath = useAppDispatch();

  let currentConcerts = useAppSelector((state) => state.concerts.allConcerts);
  let currentPartys = useAppSelector((state) => state.concerts.allPartys);
  let currentClassics = useAppSelector((state) => state.concerts.allClassics);
  let currentOpenAirs = useAppSelector((state) => state.concerts.allOpenAirs);
  let currentCoordinates = useAppSelector(
    (state) => state.concerts.allCoordinates
  );

  const handleClick = () => {
    currentConcerts = DeleteConcert(concert, currentConcerts);
    dispath(setConcerts(currentConcerts));

    const coordinates = currentCoordinates.filter(
      (c) => c.concertId === concert.Id
    )[0];
    currentCoordinates = DeleteCoordinates(coordinates, currentCoordinates);
    dispath(setCoordinates(currentCoordinates));

    if (concert.concertType === "Classic") {
      const classic = currentClassics.filter(
        (c) => c.concertId === concert.Id
      )[0];
      currentClassics = DeleteClassic(classic, currentClassics);
      dispath(setClassics(currentClassics));
    }
    if (concert.concertType === "Party") {
      const party = currentPartys.filter((c) => c.concertId === concert.Id)[0];
      currentPartys = DeleteParty(party, currentPartys);
      dispath(setPartys(currentPartys));
    }
    if (concert.concertType === "OpenAir") {
      const openAir = currentOpenAirs.filter(
        (c) => c.concertId === concert.Id
      )[0];
      currentOpenAirs = DeleteOpenAir(openAir, currentOpenAirs);
      dispath(setOpenAirs(currentOpenAirs));
    }
  };

  return (
    <div className={styles.concert}>
      <div>
        <Link to={`/concerts/${concert.Id}`} className={styles.title}>
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
        <button onClick={handleClick} className={styles.remove}>
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};
