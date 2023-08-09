import React from "react";
import { GetPromocodes } from "../../../Requests/GET/PromocodesRequests";
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks";
import { setPromocodes } from "../../../Redux/Slices";
import { PromocodeComponent } from "../Components/Promocode/Promocode";
import styles from "./PromocodesPage.module.css";

export const PromocodesPage = () => {
  const promocodes = useAppSelector(state => state.concerts.promocodes);
  const dispatch = useAppDispatch();
   React.useEffect(() => {
    const doGet = async () => {
        const promocodes = await GetPromocodes();
        dispatch(setPromocodes(promocodes));
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doGet();
   }, [dispatch]);

  return (
    <div className={styles.block}>
      {promocodes.length !== 0 ? (
        <ul className={styles.ul}>
          {promocodes.map((p) => (
            <li className={styles.li} key={p.id}>
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
