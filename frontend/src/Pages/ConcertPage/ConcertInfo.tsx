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
      <div style={{ fontWeight: 200, fontSize: 20 }}>
        Do you want to get to this event? Then buy tickets right now! The number
        of tickets is limited
      </div>
      <div className={styles.block}>
        <div className={styles.description}>
          <div>
            When: <span style={{ fontWeight: 400 }}>{data.concertDate}</span>
          </div>
          <div>
            Where: <span style={{ fontWeight: 400 }}>{data.location}</span>
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
      </div>
    </div>
  );
};
