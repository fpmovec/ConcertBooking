import { getAccessToken } from "../../Authorization/AuthProvider";

export const DeleteBooking = async (id: number) => {
    await fetch(`https://localhost:7235/Booking/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + `${await getAccessToken()}`
        }
    })
}