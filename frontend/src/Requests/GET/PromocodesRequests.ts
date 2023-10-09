import { getAccessToken } from "../../Authorization/AuthProvider";
import { Promocode } from "../../Models/Promocode";

export const GetPromocodes = async (): Promise<Promocode[]> => {
  let promocodes: Promocode[] = [];
  const response = await fetch("http://localhost:5207/Promocode", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + `${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
  });

  promocodes = (await response.json()) as Promocode[];
  return promocodes;
};

export const GetPromocodeById = async (id: number): Promise<Promocode> => {
  const response = await fetch(`http://localhost:5207/Promocode/${id}`, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + `${await getAccessToken()}`,
        "Content-Type": "application/json",
    },
  });

  const promocode = await response.json() as Promocode;
  return promocode;
};
