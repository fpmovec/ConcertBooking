export interface Concert {
  Id: number;
  performer: string;
  ticketsCount: number;
  concertDate: string;
  location: string;
  concertType: string;
}

export interface Coordinates {
  concertId: number;
  longitude: string;
  latitude: string;
}
export interface Classic {
    concertId: number;
  voiceType: string;
  concertName: string;
  composer: string;
}

export interface OpenAir {
    concertId: number;
  headliner: string;
  journey: string;
}

export interface Party {
    concertId: number;
  ageLimit: number;
}
