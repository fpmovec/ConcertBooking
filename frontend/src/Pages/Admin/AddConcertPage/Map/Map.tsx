//import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import React from "react";
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  withYMaps,
} from "react-yandex-maps";

interface Props {
  setCoordinates: (coord: number[]) => void
}

export const MapComponent = ({ setCoordinates } : Props) => {
  const defaultState = {
    center: [53.902735, 27.555696],
    zoom: 11,
  };
const [coord, setCoord] = React.useState([53.902735, 27.555696]);
  return (
    <div>
      <YMaps
        enterprise
        query={{
          apikey: "c5fe99d9-8d5e-4ac7-ab12-b96022fdf8da",
        }}
      >
        <Map
          defaultState={defaultState}
          width={500}
          height={300}
          instanceRef={(inst) => {
            if (inst !== null) {
              inst.events.add("click", (e) => {
                const coordinates = e.get("coords");
                setCoordinates(coordinates);
                setCoord(coordinates)
              });
                
              } 
            }
          }
        >
          {coord.length > 0 && (<Placemark geometry={[coord[0], coord[1]]} />)}
        </Map>
      </YMaps>
    </div>
  );
};
