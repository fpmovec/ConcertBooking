import { getAccessToken } from "../../Authorization/AuthProvider";
import { BookingDto } from "./BookingsRequests";

export const PostOrder = async (order: BookingDto) => {
   await fetch('https://api.concert.tw1.su/Orders', {
    method: "POST", 
    headers: {
        "Authorization": "Bearer " + `${await getAccessToken()}`,
        "Content-Type": "application/json",        
    },
    body: JSON.stringify(order)
   })
}