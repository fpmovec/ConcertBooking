import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAppSelector } from "../../Redux/Hooks"; 
import styles from "./Pay.module.css";
import { bookedConcert } from "../../Redux/Slices";

const initialOptions = {
  clientId:
    "AWNjTVENcpaNZkUd75U1rv8HTKM3mLRmjIDMOj3fDGVrC3N8LBo0AE5cBIc6iv1CHbmnoIZwGeWyGeru",
  currency: "USD",
  intent: "capture",
};

export const Pay = () => {
  const { bookingId } = useParams();

  const allBookings = useAppSelector(state => state.concerts.booking);
  console.log(allBookings);
  const currentBooking = [...allBookings].filter(b => b.id === Number(bookingId))[0];
  console.log(currentBooking);
  return (
    <div className={styles.main}>
      <div className={styles.buttons}>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: currentBooking.purchaseAmount.toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order!.capture().then(function (details) {
                console.log(
                  "Transaction completed by " + 
                  details.payer.name!.given_name!
                );
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};
