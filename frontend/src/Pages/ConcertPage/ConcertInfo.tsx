import {
  concerts,
  partys,
  openAirs,
  classics,
  ConcertCoordinates,
} from "../../Models/MockData";
import { Classic, Party, OpenAir } from "../../Models/ConcertModels";
import { Concert } from "../../Models/ConcertModels";
import { NotFound } from "../NotFoundPage/NotFoundPage";
import { MapComponent } from "../../Components/Maps/Map";
import styles from "./ConcertPage.module.css";

interface Props {
  data: Concert | null;
}

export const ConcertInfo = ({ data }: Props) => {
  if (data === null) return <NotFound />;

  const isParty = data.concertType === "Party";
  const isOpenAir = data.concertType === "OpenAir";
  const isClassic = data.concertType === "Classic";

  const getMorePartyInfo = () =>
    partys.filter((c) => c.concertId === data.Id)[0];

  const getMoreClassicInfo = () =>
    classics.filter((c) => c.concertId === data.Id)[0];

  const getMoreOpenAirInfo = () =>
    openAirs.filter((c) => c.concertId === data.Id)[0];

  const coordinates = ConcertCoordinates.filter(
    (c) => c.concertId === data.Id
  )[0];
  return (
    <div>
      <div className={styles.title}>
        {data.performer}
        <button>Buy ticket</button>
      </div>
      <div style={{ marginLeft: 10, fontWeight: 200, fontSize: 20 }}>
        Do you want to get to this event? Then buy tickets right now! The number
        of tickets is limited. Tickets left: {data.ticketsCount}
      </div>
      <div className={styles.block}>
        <div className={styles.description}>
          <div>
            When: <span>{data.concertDate}</span>
          </div>
          <div>
            Where: <span>{data.location}</span>
          </div>
        </div>
        <div className={styles.map}>
          <MapComponent location={coordinates} />
        </div>
      </div>
      <div>
        {isParty && (
          <div>
            <h2>🔞Age Limit: {getMorePartyInfo().ageLimit}</h2>
          </div>
        )}
        {isClassic && (
          <ul className={styles.list}>
            <li>
              Composer: <span>{getMoreClassicInfo().composer}</span>
            </li>
            <li>
              Voice Type: <span>{getMoreClassicInfo().concertName}</span>
            </li>
            <li>
              Concert Name: <span>{getMoreClassicInfo().concertName}</span>
            </li>
          </ul>
        )}
        {isOpenAir && (
           <ul className={styles.list}>
           <li>
             Headliner: <span className={styles.date}>{getMoreOpenAirInfo().headliner}</span>
           </li>
           <li>
             Journey: <span>{getMoreOpenAirInfo().journey}</span>
           </li>
         </ul>
        )}
      </div>
    </div>
  );
};
