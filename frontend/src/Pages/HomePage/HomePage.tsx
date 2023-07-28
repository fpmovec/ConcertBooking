import { ConcertList } from "../../Components/Concert/ConcertList";
import { concerts } from "../../Models/MockData";
import { TypeCheckbox } from "../../Components/SortPanel/SortPanel";
import { useState } from "react";
import styles from "./HomePage.module.css";

export interface IConcertType {
  classics: boolean;
  partys: boolean;
  openAirs: boolean;
}

export const HomePage = () => {
  const [concertType, setConcertType] = useState<IConcertType>({
    classics: true,
    partys: true,
    openAirs: true,
  });

  const typeFilter = (arg: string) => concerts.filter(c => c.concertType === arg);

  return (
    <>
      <div className={styles.checkboxes}>
        <TypeCheckbox
          value={concertType.classics}
          label="Classics"
          handleChange={(e) =>
            setConcertType((prev) => ({ ...prev, classics: !prev.classics }))
          }
        />
        <TypeCheckbox
          value={concertType.partys}
          label="Partys"
          handleChange={(e) =>
            setConcertType((prev) => ({ ...prev, partys: !prev.partys }))
          }
        />
        <TypeCheckbox
          value={concertType.openAirs}
          label="OpenAirs"
          handleChange={(e) =>
            setConcertType((prev) => ({ ...prev, openAirs: !prev.openAirs }))
          }
        />
      </div>
      <div>
        {!(
          concertType.classics ||
          concertType.openAirs ||
          concertType.partys
        ) && <div className="notFound">Nothing found 😔</div>}
        {concertType.classics && <ConcertList data={typeFilter("Classic")}/>}
        {concertType.partys && <ConcertList data={typeFilter("Party")}/>}
        {concertType.openAirs && <ConcertList data={typeFilter("OpenAir")}/>}
      </div>
    </>
  );
};
