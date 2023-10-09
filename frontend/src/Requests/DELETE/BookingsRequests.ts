import { getAccessToken } from "../../Authorization/AuthProvider";

export const DeleteBooking = async (id: number) => {
    await fetch(`https://api.concert.tw1.su/Booking/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + `${await getAccessToken()}`
        }
    })
}