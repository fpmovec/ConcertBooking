import { getAccessToken } from "../../Authorization/AuthProvider";
import { Order } from "../../Models/OrderModels";

export const GetOrdersByEmail = async (email: string) => {
    let orders: Order[] = [];
    const response = await fetch(`https://api.concert.tw1.su/Orders/${email}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + `${await getAccessToken()}`,
            "Content-Type": "application/json",          
        }
    });

    orders = await response.json() as Order[];
    return orders;
}