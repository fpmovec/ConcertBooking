import React from "react";
import { PurchasedComponent } from "../../Components/Booking/PurchasedComponent";
import { GetConcert } from "../../Models/ConcertFunctions";
import { useAppSelector, useAppDispatch } from "../../Redux/Hooks";
import { setPurchases } from "../../Redux/Slices";
import { useAuth } from "../../Authorization/Auth";
import styles from "./Purchased.module.css";
import { GetOrdersByEmail } from "../../Requests/GET/OrdersRequests";

export const PurchasedPage = () => {
  const purchasedTickets = useAppSelector((state) => state.concerts.purchased);
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const concerts = useAppSelector(state => state.concerts.allConcerts);
React.useEffect(() => {
  const doGet = async () => {
    const orders = await GetOrdersByEmail(user!.email);
    dispatch(setPurchases(orders));
  }
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  doGet();
}, [dispatch, user]);

  console.log(purchasedTickets);
  return purchasedTickets.length === 0 ? (
    <div className="notFound">You haven't purchased any tickets yet 🙄</div>
  ) : (
    <ul className={styles.ul}>
      {purchasedTickets.map((b) => (
        <li className={styles.li} key={b.id}>
          <PurchasedComponent
            order={b}
            concertPerformer={GetConcert(b.concertId, concerts)?.performer}
          />
        </li>
      ))}
    </ul>
  );
};
