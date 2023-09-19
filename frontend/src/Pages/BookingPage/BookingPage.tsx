import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  setPromocodes,
} from "../../Redux/Slices";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { ErrorField } from "../../Components/SuccesErrorFields/ErrorField";
import { useAuth } from "../../Authorization/Auth";
import { Currency } from "../../Components/Currency/Currency";
import styles from "./BookingPage.module.css";
import React from "react";
import {
  GetConfirmationCode,
  SendConfirmationCode,
} from "../../Requests/EmailConfirmation";
import { PostBooking } from "../../Requests/POST/BookingsRequests";
import { GetPromocodes } from "../../Requests/GET/PromocodesRequests";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ticketQuantity: number;
  concertId: number;
  promocode: string;
  code: string;
};

export const BookingPage = () => {
  const { user } = useAuth();
  const promocodes = useAppSelector((state) => state.concerts.promocodes);
  const concerts = useAppSelector((state) => state.concerts.allConcerts);
  const { concertId } = useParams();
  const concertByCurrentId = concerts.find((c) => c.id === Number(concertId));
  const firstPrice = concertByCurrentId!.price;
  const [isPromo, setIsPromo] = React.useState<boolean>();
  const [promoPrice, setPromoPrice] = React.useState(concertByCurrentId!.price);
  const [isApplied, setIsApplied] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const IsPromo = (data: string): boolean => {
    const code = promocodes.filter((pc) => pc.code === data.trim());
    if (code.length !== 0) {
      if (!isApplied) {
        setPromoPrice(code[0].total * firstPrice);
      setIsApplied(true);
      }
      return true;
    } else {
      if (data === "") return true;
      setPromoPrice(firstPrice)
      setIsApplied(false)
      return false;
    }
  };


  React.useEffect(() => {
    const doGet = async () => {
      const promocodes = await GetPromocodes();
      dispatch(setPromocodes(promocodes));
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doGet();
  }, [dispatch]);


  const IsValidCode = async (data: string) => {
    const code = await GetConfirmationCode();
    return code === data.trim() ? true : false;
  };

  const confirm = async (data: FormData) => {
    setIsConfirmation(true);
    setCurrentForm(data);
    await SendConfirmationCode(user!.email);
  };

  const [isConfirmation, setIsConfirmation] = React.useState(false);
  const [currentForm, setCurrentForm] = React.useState<FormData>();
  const navigate = useNavigate();
  const bookings = useAppSelector((state) => state.concerts.booking);

  const [quantity, setQuantity] = React.useState(1);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  console.log(bookings);

  const submit = () => {
    const doAdd = async () => {
      await PostBooking({
        firstName: currentForm!.firstName,
        lastName: currentForm!.lastName,
        email: user!.email,
        phoneNumber: currentForm!.phoneNumber,
        ticketQuantity: currentForm!.ticketQuantity,
        concertId: Number(concertId),
        purchaseAmount: promoPrice * quantity,
      });
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    doAdd();
    navigate("/thanks?status=booking");
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
      {isConfirmation ? (
        <div>
          <div style={{ fontWeight: 200, fontSize: 23, textAlign: "center" }}>
            A confirmation code has been sent to your email. Enter it below:
          </div>
          <div className={styles.confirm}>
            <form onSubmit={(event) => void handleSubmit(submit)(event)}>
              <input
                type="text"
                {...register("code", {
                  required: true,
                  validate: {
                    isValidCode: async (v) => (await IsValidCode(v)) === true,
                  },
                })}
              />
              {errors.code && errors.code.type === "required" && (
                <ErrorField data="Enter the code" />
              )}
              {errors.code && errors.code.type === "isValidCode" && (
                <ErrorField data="The code is not correct" />
              )}
              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <form
            onSubmit={(event) => void handleSubmit(confirm)(event)}
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
              {errors.ticketQuantity &&
                errors.ticketQuantity.type === "min" && (
                  <ErrorField data="You can book at least 1 ticket" />
                )}
              {errors.ticketQuantity &&
                errors.ticketQuantity.type === "max" && (
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
                      isPromo: (v) => IsPromo(v.trim()) === true,
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
      )}
    </div>
  );
};
