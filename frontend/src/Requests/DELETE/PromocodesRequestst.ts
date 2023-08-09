import { getAccessToken } from "../../Authorization/AuthProvider";

export const DeletePromocode = async (id: number): Promise<void> => {
  await fetch(`https://localhost:7235/Promocode/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + `${await getAccessToken()}`,
    },
  });
};
