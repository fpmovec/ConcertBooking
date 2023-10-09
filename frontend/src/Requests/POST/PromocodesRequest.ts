import { getAccessToken } from "../../Authorization/AuthProvider";

interface PromoDto {
  code: string;
  total: number;
}

export const PostPromocode = async (promo: PromoDto): Promise<void> => {
  await fetch(`http://localhost:5207/Promocode`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + `${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promo),
  });
};
