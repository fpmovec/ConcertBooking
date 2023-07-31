import { useParams, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAppSelector, useAppDispatch } from "../../Redux/Hooks";
import styles from "./Pay.module.css";
import { addPurchase, setBookings } from "../../Redux/Slices";
import { useDispatch } from "react-redux";
import { DeleteBooking } from "../../Models/ConcertFunctions";

const initialOptions = {
  clientId:
    "AWNjTVENcpaNZkUd75U1rv8HTKM3mLRmjIDMOj3fDGVrC3N8LBo0AE5cBIc6iv1CHbmnoIZwGeWyGeru",
  currency: "USD",
  intent: "capture",
};

export const Pay = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const allBookings = useAppSelector((state) => state.concerts.booking);
  const dispatch = useDispatch();
  const currentBooking = [...allBookings].filter(
    (b) => b.id === Number(bookingId)
  )[0];
  let currBookings = allBookings;

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
                  "Transaction completed by " + details.payer.name!.given_name!
                );
                currBookings = DeleteBooking(currentBooking, allBookings);
                dispatch(setBookings(currBookings));
                dispatch(addPurchase(currentBooking));
                navigate(`/thanks?status=purchase`);
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};
