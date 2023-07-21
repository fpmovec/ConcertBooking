export interface Classic {
    performer: string;
    ticketsCount: number;
    concertDate: Date;
    location: string;
    concertType: string;
    voiceType: string;
    concertName: string;
    composer: string;
}

export interface OpenAir {
    performer: string;
    ticketsCount: number;
    concertDate: Date;
    location: string;
    concertType: string;
    headliner: string;
    journey: string;
}

export interface Party {
    performer: string;
    ticketsCount: number;
    concertDate: Date;
    location: string;
    concertType: string;
    ageLimit: number;
}