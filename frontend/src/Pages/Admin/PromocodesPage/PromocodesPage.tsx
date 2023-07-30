import React from "react";
import { setPromocodes } from "../../../Redux/Slices";
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks";
import { PromocodeComponent } from "../Components/Promocode/Promocode";
import styles from "./PromocodesPage.module.css";
import { DeletePromocode } from "../../../Models/ConcertFunctions";

export const PromocodesPage = () => {
  const promocodes = useAppSelector((state) => state.concerts.promocodes);

  return (
    <div className={styles.block}>
      {promocodes.length !== 0 ? (
        <ul className={styles.ul}>
          {promocodes.map((p) => (
            <li className={styles.li} key={p.code}>
              <PromocodeComponent data={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="notFound">
          You have not added any promo codes yet 😮
        </div>
      )}
    </div>
  );
};
