import { getAccessToken } from "../../Authorization/AuthProvider";

export interface BookingDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    ticketQuantity: number;
    concertId: number;
    purchaseAmount: number;
}

export const PostBooking = async (booking: BookingDto) => {
  await fetch("https://localhost:7235/Booking", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + `${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking)
  });
};
