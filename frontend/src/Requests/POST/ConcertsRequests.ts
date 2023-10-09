import { getAccessToken } from "../../Authorization/AuthProvider";
import { Coordinates } from "../../Models/ConcertModels";

interface ClassicDto {
  performer: string;
  ticketsCount: number;
  concertDate: string;
  location: string;
  price: number;
  voiceType: string;
  concertName: string;
  composer: string;
  coordinates: Coordinates;
}

interface PartyDto {
  performer: string;
  ticketsCount: number;
  concertDate: string;
  location: string;
  price: number;
  agelimit: number;
  coordinates: Coordinates
}

interface OpenAirDto {
  performer: string;
  ticketsCount: number;
  concertDate: string;
  location: string;
  price: number;
  journey: string;
  headliner: string;
  coordinates: Coordinates;
}

export const PostClassic = async (
  dto: ClassicDto,

) => {
  await fetch(`http://localhost:5207/classic`, {
    method: "POST",
    headers: {
      'Authorization': "Bearer " + `${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });
};


export const PostParty = async (dto: PartyDto) => {
    await fetch(`http://localhost:5207/party`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + `${await getAccessToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
    })

};

export const PostOpenAir = async (dto: OpenAirDto) => {
    await fetch(`http://localhost:5207/openair`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + `${await getAccessToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dto)
    });

}

