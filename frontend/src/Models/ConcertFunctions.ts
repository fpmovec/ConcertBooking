import { getAccessToken } from "../Authorization/AuthProvider";
import { Booking } from "./BookingModels";
import { Classic, Concert, Coordinates, OpenAir, Party } from "./ConcertModels";
import { Promocode } from "./Promocode";

export const GetConcert = (
  concertId: number,
  concerts: Concert[]
): Concert | null => {
  const foundConcert = concerts.filter((c) => c.id === concertId);

  if (foundConcert.length !== 0) return foundConcert[0];

  return null;
};

export const GetConcerts = async (): Promise<void> => {
  //let concerts: Concert[] = [];
  const promocode: Promocode = {
    code: "ASDF",
    total: 0.8,
  };
  console.log("I am an async function");
  const response = await fetch(`https://localhost:7235/Promocode`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + `${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promocode),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response1 = await fetch(`https://localhost:7235/Promocode`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + `${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
  });
  console.log(await response1.json());
};

export const GetConcertsByCriteria = (
  criteria: string | null,
  concerts: Concert[]
): Concert[] => {
  return criteria === null
    ? concerts
    : concerts.filter(
        (c) => c.performer.toLowerCase().indexOf(criteria.toLowerCase()) > -1
      );
};

export function DeleteBooking(element: Booking, array: Booking[]): Booking[] {
  return array.filter((b) => b.id !== element.id);
}

export function DeletePromocode(
  element: string,
  array: Promocode[]
): Promocode[] {
  return array.filter((p) => p.code !== element);
}

export function DeleteConcert(element: Concert, array: Concert[]): Concert[] {
  return array.filter((b) => b.id !== element.id);
}
export function DeleteParty(element: Party, array: Party[]): Party[] {
  return array.filter((b) => b.concertId !== element.concertId);
}
export function DeleteOpenAir(element: OpenAir, array: OpenAir[]): OpenAir[] {
  return array.filter((b) => b.concertId !== element.concertId);
}
export function DeleteClassic(element: Classic, array: Classic[]): Classic[] {
  return array.filter((b) => b.concertId !== element.concertId);
}
export function DeleteCoordinates(
  element: Coordinates,
  array: Coordinates[]
): Coordinates[] {
  return array.filter((b) => b.concertId !== element.concertId);
}

export const getCode = () => {
  return "1111";
};
