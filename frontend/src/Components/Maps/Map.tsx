import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Coordinates } from "../../Models/ConcertModels";

interface Props {
    location: Coordinates;
}

export const MapComponent = ({ location } : Props) => {
  const defaultState = {
    center: [location.longitude, location.latitude],
    zoom: 11,
  };

  return (
    <div>
      <YMaps>
        <Map defaultState={defaultState} width={500} height={300}>
          <Placemark geometry={[location.longitude, location.latitude]} />
        </Map>
      </YMaps>
    </div>
  );
};
