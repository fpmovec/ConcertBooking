import { Booking } from "./BookingModels";
import { Concert } from "./ConcertModels";
import { concerts } from "./MockData";
import { Promocode } from "./Promocode";

export const getConcert = (concertId: number): Concert | null => {
  const foundConcert = concerts.filter((c) => c.Id === concertId);

  if (foundConcert.length !== 0) return foundConcert[0];

  return null;
};

export const getConcertsByCriteria = (criteria: string | null): Concert[] => {
  return criteria === null
    ? concerts
    : concerts.filter(
        (c) => c.performer.toLowerCase().indexOf(criteria.toLowerCase()) > -1
      );
};

export function DeleteBooking(element: Booking, array: Booking[]): Booking[] {
  return array.filter((b) => b.id !== element.id);
}

export function DeletePromocode(element: string, array: Promocode[]): Promocode[] {
  return array.filter(p => p.code !== element);
}
