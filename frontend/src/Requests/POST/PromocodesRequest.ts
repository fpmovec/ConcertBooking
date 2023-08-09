import { getAccessToken } from "../../Authorization/AuthProvider";

interface PromoDto {
  code: string;
  total: number;
}

export const PostPromocode = async (promo: PromoDto): Promise<void> => {
  await fetch(`https://localhost:7235/Promocode`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + `${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promo),
  });
};
