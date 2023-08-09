import { Promocode } from "../../../../Models/Promocode";
import styles from "./Promocode.module.css";

import { DeletePromocode } from "../../../../Requests/DELETE/PromocodesRequestst";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import { setPromocodes } from "../../../../Redux/Slices";
import { GetPromocodes } from "../../../../Requests/GET/PromocodesRequests";

interface Props {
  data: Promocode;
}

export const PromocodeComponent = ({ data }: Props) => {
  const dispath = useAppDispatch();

  const handleClick = () => {
    const remove = async () => {
      await DeletePromocode(data.id);
      const promocodes = await GetPromocodes();
      dispath(setPromocodes(promocodes));
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    remove();
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
        <button onClick={handleClick} className={styles.remove}>
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};
