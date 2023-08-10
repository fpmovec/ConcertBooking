import { Concert } from "./ConcertModels";


export const GetConcert = (
  concertId: number,
  concerts: Concert[]
): Concert | null => {
  const foundConcert = concerts.filter((c) => c.id === concertId);

  if (foundConcert.length !== 0) return foundConcert[0];

  return null;
};

