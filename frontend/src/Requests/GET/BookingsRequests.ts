import { getAccessToken } from "../../Authorization/AuthProvider";
import { Booking } from "../../Models/BookingModels";



export const GetAllBookingsByEmail = async (email: string) => {
    let bookings: Booking[] = [];
    const response = await fetch(`http://localhost:5207/Booking/${email}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + `${await getAccessToken()}`,
            "Content-Type": "application/json",
        }
    })

    bookings = await response.json() as Booking[];
    return bookings;
}