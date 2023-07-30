import { Promocode } from "../../../../Models/Promocode";
import styles from "./Promocode.module.css";
import { DeletePromocode } from "../../../../Models/ConcertFunctions";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import { setPromocodes } from "../../../../Redux/Slices";


interface Props {
  data: Promocode;
}

export const PromocodeComponent = ({ data }: Props) => {

    const allpromocodes = useAppSelector(state => state.concerts.promocodes);
    let promocodes = allpromocodes;
    const dispath = useAppDispatch();

  const handleClick = () => {
    promocodes = DeletePromocode(data.code, allpromocodes);
    dispath(setPromocodes(promocodes));
  };

  return (
    <div className={styles.block}>
              <div>
                <div>
                  <span style={{ fontWeight: 200 }}>Code:</span> {data.code}
                </div>
                <div>
                  <span style={{ fontWeight: 200 }}>Discount:</span>{" "}
                  {Math.round(100 * (1 - data.total))}%
                </div>
              </div>
              <div>
                <button onClick={handleClick} className={styles.remove}>🗑️ Remove</button>
              </div>
            </div>
  );
};
