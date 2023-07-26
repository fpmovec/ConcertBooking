import { Concert } from "./ConcertModels";
import { concerts } from "./MockData";

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
