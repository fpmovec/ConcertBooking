export interface Concert {
  id: number;
  performer: string;
  ticketsCount: number;
  concertDate: string;
  location: string;
  concertType: string;
  price: number;
}

export interface Coordinates {
  concertId: number;
  longitude: number;
  latitude: number;
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
