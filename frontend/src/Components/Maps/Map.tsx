//import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Coordinates } from "../../Models/ConcertModels";
import React from "react";
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  withYMaps,
} from "react-yandex-maps";

interface Props {
  location: Coordinates;
}

export const MapComponent = ({ location }: Props) => {
  const defaultState = {
    center: [location.longitude, location.latitude],
    zoom: 11,
  };

  const [coord, setCoord] = React.useState([]);
  return (
    <div>
      <YMaps
        enterprise
        query={{
          apikey: "c5fe99d9-8d5e-4ac7-ab12-b96022fdf8da",
        }}
      >
        <Map
          defaultState={{
            zoom: 11,
            center: [location.longitude, location.latitude],
          }}
          width={500}
          height={300}
        >
          <Placemark geometry={[location.longitude, location.latitude]} />
          <SearchControl />
        </Map>
      </YMaps>
    </div>
  );
};
