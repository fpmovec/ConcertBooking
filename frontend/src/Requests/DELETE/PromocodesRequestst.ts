import { getAccessToken } from "../../Authorization/AuthProvider";

export const DeletePromocode = async (id: number): Promise<void> => {
  await fetch(`https://api.concert.tw1.su/Promocode/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + `${await getAccessToken()}`,
    },
  });
};
