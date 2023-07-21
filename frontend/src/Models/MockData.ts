import { Classic, OpenAir, Party } from "./ConcertModels";

export const partys: Party[] = [
  {
    performer: "Dj Rave",
    ticketsCount: 20,
    concertDate: new Date("2023-9-27T18:00"),
    location: "Minsk",
    concertType: "party",
    ageLimit: 18,
  },
  {
    performer: "Dj Rav",
    ticketsCount: 20,
    concertDate: new Date("2023-9-28T18:00"),
    location: "Minsk",
    concertType: "party",
    ageLimit: 18,
  },
];

export const openAirs: OpenAir[] = [
  {
    performer: "performer1",
    ticketsCount: 20,
    concertDate: new Date("2023-10-28T17:00"),
    location: "Minsk",
    concertType: "openAir",
    headliner: "headliner1",
    journey: "journey1",
  },
  {
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
