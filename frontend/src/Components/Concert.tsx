import React from "react";
import { Classic, OpenAir, Party } from "../Models/ConcertModels";

interface PropsC {
  data: Classic;
}

interface PropsO {
  data: OpenAir;
}

interface PropsP {
  data: Party;
}

export const ClassicConcert = ({ data }: PropsC) => {
  <></>;
};

export const OpenAirConcert = ({ data }: PropsO) => {
  <></>;
};

export const PartyConcert = ({ data }: PropsP) => {
  <></>;
};

interface Props<TConcert> {
  data: TConcert;
}

function Concert<TConcert>({ data }: Props<TConcert>) {}
