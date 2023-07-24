export interface Classic {
    concertId: number;
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
    concertId: number;
    performer: string;
    ticketsCount: number;
    concertDate: Date;
    location: string;
    concertType: string;
    headliner: string;
    journey: string;
}

export interface Party {
    concertId: number;
    performer: string;
    ticketsCount: number;
    concertDate: Date;
    location: string;
    concertType: string;
    ageLimit: number;
}

export interface Concerts {
    partys: Party[];
    openAirs: OpenAir[];
    classics: Classic[];
}