import { useAppSelector, useAppDispatch } from "../../Redux/Hooks";
import {
  gotClassicInfo,
  gotOpenAirInfo,
  gotPartyInfo,
  gotCoordinates,
} from "../../Redux/Slices";
import { Concert, Party } from "../../Models/ConcertModels";
import { NotFound } from "../NotFoundPage/NotFoundPage";
import { MapComponent } from "../../Components/Maps/Map";
import { useNavigate } from "react-router-dom";
import styles from "./ConcertPage.module.css";
import { Currency } from "../../Components/Currency/Currency";
import {
  GetClassicById,
  GetPartyById,
  GetOpenAirById,
  GetCoordinatesByConcertId,
} from "../../Requests/GET/ConcertsRequests";
import React from "react";

interface Props {
  data: Concert;
}

export const ConcertInfo = ({ data }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navToBooking = () => {
    navigate(`/booking/${data.id}`);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
  };

  const isParty = data.concertType === "Party";
  const isOpenAir = data.concertType === "OpenAir";
  const isClassic = data.concertType === "Classic";
  React.useEffect(() => {
    const getInfo = async () => {
      if (isParty) {
        const concert = await GetPartyById(data.id);
        dispatch(gotPartyInfo(concert));
      }
      if (isClassic) {
        const concert = await GetClassicById(data.id);
        dispatch(gotClassicInfo(concert));
      }
      if (isOpenAir) {
        const concert = await GetOpenAirById(data.id);
        dispatch(gotOpenAirInfo(concert));
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getInfo();
  }, [data.id, dispatch, isClassic, isOpenAir, isParty]);

  const classic = useAppSelector((state) => state.concerts.viewingClassic);
  const party = useAppSelector((state) => state.concerts.viewingParty);
  const openAir = useAppSelector((state) => state.concerts.viewingOpenAir);
  const coordinates = useAppSelector(
    (state) => state.concerts.viewingCoordinates
  );

  return (
    <div>
      <div className={styles.title}>
        {data.performer}
        <button onClick={navToBooking}>Book a ticket</button>
      </div>
      <div style={{ marginLeft: 10, fontWeight: 200, fontSize: 20 }}>
        Do you want to get to this event? Then buy tickets right now! The number
        of tickets is limited.{" "}
        <span style={{ fontWeight: 400 }}>
          Tickets left: {data.ticketsCount}
        </span>
      </div>
      <div className={styles.block}>
        <div className={styles.description}>
          <div>
            ◽When: <span>{data.concertDate}</span>
          </div>
          <div>
            ◽Where: <span>{data.location}</span>
          </div>
          <div>
            ◽Ticket price:{" "}
            <span>
              <Currency currency={data.price} />
            </span>
          </div>
        </div>
        <div className={styles.map}>
          {<MapComponent location={coordinates!} />}
        </div>
      </div>
      <div>
        {isParty && (
          <div>
            <h2>🔞Age Limit: {party?.ageLimit}+</h2>
          </div>
        )}
        {isClassic && (
          <ul className={styles.list}>
            <li>
              Composer: <span>{classic?.composer}</span>
            </li>
            <li>
              Voice Type: <span>{classic?.voiceType}</span>
            </li>
            <li>
              Concert Name: <span>{classic?.concertName}</span>
            </li>
          </ul>
        )}
        {isOpenAir && (
          <ul className={styles.list}>
            <li>
              Headliner:{" "}
              <span className={styles.date}>{openAir?.headliner}</span>
            </li>
            <li>
              Journey: <span>{openAir?.journey}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
