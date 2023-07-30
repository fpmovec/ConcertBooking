import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { bookedConcert, setCurrentBookingId } from "../../Redux/Slices";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { ErrorField } from "../../Components/SuccesErrorFields/ErrorField";
import { concerts } from "../../Models/MockData";
import { Thanks } from "../Thanks/Thanks";
import { Currency } from "../../Components/Currency/Currency";
import styles from "./BookingPage.module.css";
import React from "react";
import { setPromocodes } from "../../Redux/Slices";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ticketQuantity: number;
  concertId: number;
  promocode: string;
};

export const BookingPage = () => {

const promocodes = useAppSelector(state => state.concerts.promocodes);

  const IsPromo = (data: string): boolean => {
    const code = promocodes.filter((pc) => pc.code === data);
    if (code.length !== 0) {
      setPromoPrice(code[0].total * promoPrice);
      return true;
    } else {
      setPromoPrice(firstPrice);
      if (data === "") return true;
      return false;
    }
  };

  const [isPromo, setIsPromo] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bookings = useAppSelector((state) => state.concerts.booking);
  let currentBookingId = useAppSelector(
    (state) => state.concerts.currentBookingId
  );
  const { concertId } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  const concertByCurrentId = concerts.find((c) => c.Id === Number(concertId));
  const firstPrice = concertByCurrentId!.price;
  const [promoPrice, setPromoPrice] = React.useState(concertByCurrentId!.price);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  console.log(bookings);

  const submitForm = (data: FormData) => {
    dispatch(
      bookedConcert({
        id: currentBookingId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        ticketQuantity: data.ticketQuantity,
        concertId: Number(concertId),
        purchaseAmount: promoPrice * quantity,
      })
    );
    currentBookingId = currentBookingId + 1;
    dispatch(setCurrentBookingId(currentBookingId));
    navigate("/thanks");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.title}>
        <div>{concertByCurrentId?.performer} tickets booking</div>
        <div>
          <span style={{ fontWeight: 200 }}>Total price:</span>{" "}
          {<Currency currency={promoPrice * quantity} />}
        </div>
      </div>
      <form
        onSubmit={(event) => void handleSubmit(submitForm)(event)}
        className={styles.form}
      >
        <div>
          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            type="text"
            {...register("firstName", { required: true, minLength: 3 })}
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <ErrorField data="Enter the first name" />
          )}
          {errors.firstName && errors.firstName.type === "minLength" && (
            <ErrorField data="This field must be contained at least 3 characters" />
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            type="text"
            {...register("lastName", { required: true, minLength: 3 })}
          />
          {errors.lastName && errors.lastName.type === "required" && (
            <ErrorField data="Enter the last name" />
          )}
          {errors.lastName && errors.lastName.type === "minLength" && (
            <ErrorField data="This field must be contained at least 3 characters" />
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <ErrorField data="Enter your Email" />
          )}
          {errors.email && errors.email.type === "pattern" && (
            <ErrorField data="Email is not correct" />
          )}
        </div>
        <div>
          <label htmlFor="phone">Phone number:</label>
          <input
            id="phone"
            type="text"
            {...register("phoneNumber", {
              required: true,
              pattern:
                /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
            })}
          />
          {errors.phoneNumber && errors.phoneNumber.type === "required" && (
            <ErrorField data="Enter your phone number" />
          )}
          {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
            <ErrorField data="The phone number is not correct" />
          )}
        </div>
        <div>
          <label htmlFor="tickets">Tickets quantity:</label>
          <input
            id="tickets"
            type="number"
            {...register("ticketQuantity", {
              required: true,
              min: 1,
              max: concertByCurrentId?.ticketsCount,
              validate: {
                quantity: (v) => {
                  setQuantity(v);
                  return true;
                },
              },
            })}
            defaultValue={1}
          />
          {errors.ticketQuantity &&
            errors.ticketQuantity.type === "required" && (
              <ErrorField data="Specify the number of tickets to purchase" />
            )}
          {errors.ticketQuantity && errors.ticketQuantity.type === "min" && (
            <ErrorField data="You can book at least 1 ticket" />
          )}
          {errors.ticketQuantity && errors.ticketQuantity.type === "max" && (
            <ErrorField
              data={`You can book no more than ${
                concertByCurrentId!.ticketsCount
              } tickets`}
            />
          )}
        </div>
        {isPromo && (
          <div>
            <label htmlFor="promo">Promocode:</label>
            <input
              id="promo"
              type="text"
              {...register("promocode", {
                validate: {
                  isPromo: (v) => IsPromo(v) === true,
                },
              })}
            />
            {errors.promocode && errors.promocode.type === "isPromo" && (
              <ErrorField data="An incorrect promocode" />
            )}
          </div>
        )}
        <div>
          <button type="submit">Book</button>
          <button
            type="button"
            onClick={() => setIsPromo(true)}
            className={styles.promoButton}
          >
            I have a promocode
          </button>
        </div>
      </form>
    </div>
  );
};
