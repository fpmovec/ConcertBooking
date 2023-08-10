import { useParams, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAppSelector } from "../../Redux/Hooks";
import styles from "./Pay.module.css";
import { DeleteBooking } from "../../Requests/DELETE/BookingsRequests";
import { PostOrder } from "../../Requests/POST/OrdersRequests";
import { useAuth } from "../../Authorization/Auth";


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
  const currentBooking = [...allBookings].filter(
    (b) => b.id === Number(bookingId)
  )[0];
 const { user } = useAuth();

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
              return actions.order!.capture().then(async function (details) {
                await PostOrder({
                  firstName: currentBooking.firstName,
                  lastName: currentBooking.lastName,
                  email: user!.email,
                  phoneNumber: currentBooking.phoneNumber,
                  purchaseAmount: currentBooking.purchaseAmount,
                  ticketQuantity: currentBooking.ticketQuantity,
                  concertId: currentBooking.concertId
                });
                await DeleteBooking(currentBooking.id);
                navigate(`/thanks?status=purchase`);
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};
