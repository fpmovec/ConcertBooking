import { Classic, OpenAir, Party } from "./ConcertModels";
import type { Concert, Coordinates } from "./ConcertModels";

export const concerts: Concert[] = [
  {
    Id: 1,
    performer: "Dj Rave",
    ticketsCount: 20,
    concertDate: "26.07.2023 17:00",
    location: "Minsk",
    concertType: "Party",
  },
  {
    Id: 2,
    performer: "Dj Rav",
    ticketsCount: 20,
    concertDate: "26.07.2023 17:00",
    location: "Minsk",
    concertType: "Party",
  },
  {
    Id: 3,
    performer: "performer1",
    ticketsCount: 20,
    concertDate: "27.07.2023 15:00",
    location: "Minsk",
    concertType: "OpenAir",
  },
  {
    Id: 4,
    performer: "performer2",
    ticketsCount: 20,
    concertDate: "30.07.2023 18:00",
    location: "Minsk",
    concertType: "OpenAir",
  },
  {
    Id: 5,
    performer: "performer1",
    ticketsCount: 20,
    concertDate: "25.07.2023 13:00",
    location: "Minsk",
    concertType: "Classic",
  },
  {
    Id: 6,
    performer: "performer2",
    ticketsCount: 20,
    concertDate: "26.07.2023 13:00",
    location: "Minsk",
    concertType: "Classic",
  },
];

export const ConcertCoordinates: Coordinates[] = [
  {
    concertId: 1,
    longitude: 53.889077,
    latitude: 27.571535,
  },
  {
    concertId: 2,
    longitude: 53.889077,
    latitude: 27.571535,
  },
  {
    concertId: 3,
    longitude: 53.889077,
    latitude: 27.571535,
  },
  {
    concertId: 4,
    longitude: 53.889077,
    latitude: 27.571535,
  },
  {
    concertId: 5,
    longitude: 53.889077,
    latitude: 27.571535,
  },
  {
    concertId: 6,
    longitude: 53.889077,
    latitude: 27.571535,
  },
];

export const partys: Party[] = [
  {
    concertId: 1,
    ageLimit: 18,
  },
  {
    concertId: 2,
    ageLimit: 18,
  },
];

export const openAirs: OpenAir[] = [
  {
    concertId: 3,
    headliner: "headliner1",
    journey: "journey1",
  },
  {
    concertId: 4,
    headliner: "headliner2",
    journey: "journey2",
  },
];

export const classics: Classic[] = [
  {
    concertId: 5,
    voiceType: "type1",
    concertName: "name1",
    composer: "composer1",
  },
  {
    concertId: 6,
    voiceType: "type2",
    concertName: "name2",
    composer: "composer2",
  },
];

export const getConcert = (concertId: number): Concert | null => {
  const foundConcert = concerts.filter((c) => c.Id === concertId)

  if (foundConcert.length !== 0)
    return foundConcert[0];
  
  return null;
};
