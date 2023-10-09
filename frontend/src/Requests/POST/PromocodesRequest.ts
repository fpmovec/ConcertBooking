import { getAccessToken } from "../../Authorization/AuthProvider";

interface PromoDto {
  code: string;
  total: number;
}

export const PostPromocode = async (promo: PromoDto): Promise<void> => {
  await fetch(`https://api.concert.tw1.su/Promocode`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + `${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promo),
  });
};
