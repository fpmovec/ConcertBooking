import { Booking } from "./BookingModels";
import { Classic, Concert, Coordinates, OpenAir, Party } from "./ConcertModels";
import { useAppSelector } from "../Redux/Hooks";
import { Promocode } from "./Promocode";

export const GetConcert = (
  concertId: number,
  concerts: Concert[]
): Concert | null => {
  const foundConcert = concerts.filter((c) => c.Id === concertId);

  if (foundConcert.length !== 0) return foundConcert[0];

  return null;
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
  return array.filter((b) => b.Id !== element.Id);
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
