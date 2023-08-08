/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Classic,
  Concert,
  Coordinates,
  OpenAir,
  Party,
} from "../../Models/ConcertModels";

export const GetAllConcerts = async (): Promise<Concert[]> => {
  let allConcerts: Concert[] = [];

  const response = await fetch("https://localhost:7235/concerts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  allConcerts = await response.json();
  return allConcerts;
};

export const GetConcertById = async (id: number): Promise<Concert> => {
  const response = await fetch(`https://localhost:7235/concert/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const concert: Concert = await response.json();
  return concert;
};

export const GetClassicById = async (id: number): Promise<Classic> => {
  const response = await fetch(`https://localhost:7235/classic/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const classic: Classic = await response.json();
  return classic;
};

export const GetPartyById = async (id: number): Promise<Party> => {
  const response = await fetch(`https://localhost:7235/party/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const classic: Party = await response.json();
  return classic;
};

export const GetOpenAirById = async (id: number): Promise<OpenAir> => {
  const response = await fetch(`https://localhost:7235/openair/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const classic: OpenAir = await response.json();
  return classic;
};

export const GetCoordinatesByConcertId = async (
  id: number
): Promise<Coordinates> => {
  const response = await fetch(`https://localhost:7235/coordinates/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const coordinates: Coordinates = await response.json();
  return coordinates;
};

export const GetConcertsByCriteria = async (
  criteria: string | null
): Promise<Concert[]> => {
  let response: Response;
  if (criteria !== null && criteria !== '')
    response = await fetch(`https://localhost:7235/search/${criteria}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  else
    response = await fetch("https://localhost:7235/concerts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  const concerts: Concert[] = await response.json();
  return concerts;
};
