import { getAccessToken } from "../../Authorization/AuthProvider"

export const DeleteConcert = async (id: number) => {
   await fetch(`https://api.concert.tw1.su/concerts/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + `${await getAccessToken()}`
    }
   })
}