import { Link } from "react-router-dom";
import { Currency } from "../Currency/Currency";
import styles from './BookingComponent.module.css'
import { Order } from "../../Models/OrderModels";

interface Props {
    order: Order;
    concertPerformer: string | undefined;
  }

export const PurchasedComponent = ({ order, concertPerformer}: Props) => {
    return (
        <div className={styles.booking}>
          <div className={styles.title}>
            <div>Purchase Id: {order.id}</div>
            <div>
              <span style={{ fontWeight: 200 }}>Total price: </span>{" "}
              <Currency currency={order.purchaseAmount} />
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.description}>
              <div>
                ➡️ Performer:{" "}
                <span>
                  <Link
                    className={styles.link}
                    to={`/concerts/${order.concertId}`}
                  >
                    {concertPerformer}
                  </Link>
                </span>
                <br />
                📛 Name: {order.fullName}
              </div>
              <div>
                📧 Email: {order.email}
                <br />
                🎫 Ticket quantity: {order.ticketQuantity}
              </div>
            </div>
          </div>
        </div>
      );
}