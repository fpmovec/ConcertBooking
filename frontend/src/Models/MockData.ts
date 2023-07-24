import { Classic, OpenAir, Party } from "./ConcertModels";

export const partys: Party[] = [
  {
    concertId: 1,
    performer: "Dj Rave",
    ticketsCount: 20,
    concertDate: new Date(),
    location: "Minsk",
    concertType: "party",
    ageLimit: 18,
  },
  {
    concertId: 2,
    performer: "Dj Rav",
    ticketsCount: 20,
    concertDate: new Date(),
    location: "Minsk",
    concertType: "party",
    ageLimit: 18,
  },
];

export const openAirs: OpenAir[] = [
  {
    concertId: 3,
    performer: "performer1",
    ticketsCount: 20,
    concertDate: new Date("2023-10-28T17:00"),
    location: "Minsk",
    concertType: "openAir",
    headliner: "headliner1",
    journey: "journey1",
  },
  {
    concertId: 4,
    performer: "performer2",
    ticketsCount: 20,
    concertDate: new Date("2023-10-30T17:00"),
    location: "Minsk",
    concertType: "openAir",
    headliner: "headliner2",
    journey: "journey2",
  },
];

export const classics: Classic[] = [
  {
    concertId: 5,
    performer: "performer1",
    ticketsCount: 20,
    concertDate: new Date("2023-10-10T17:00"),
    location: "Minsk",
    concertType: "classic",
    voiceType: "type1",
    concertName: "name1",
    composer: "composer1",
  },
  {
    concertId: 6,
    performer: "performer2",
    ticketsCount: 20,
    concertDate: new Date("2023-10-10T17:00"),
    location: "Minsk",
    concertType: "classic",
    voiceType: "type2",
    concertName: "name2",
    composer: "composer2",
  }
];
