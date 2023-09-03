import {
  YMaps,
  Map,
  SearchControl,
  FullscreenControl,
} from "react-yandex-maps";

import { useGlobalContext } from "../../../../Redux/Hooks";
import styles from "../AddConcertPage.module.css";

export const MapComponent = () => {
  const { setCoordinates, setLocation } = useGlobalContext();
  return (
    <>
      <YMaps
        enterprise
        query={{
          apikey: "c5fe99d9-8d5e-4ac7-ab12-b96022fdf8da",
        }}
      >
        <Map
          modules={["geocode", "control.SearchControl"]}
          defaultState={{
            center: [53.902735, 27.555696],
            zoom: 11,
          }}
          width={700}
          height={500}
        >
          <FullscreenControl />
          <SearchControl
            options={{
              float: "right",
              provider: "yandex#search",
              geoObjectStandardPreset: "islands#blueDotIcon",
              searchControlMaxWidth: [30, 72, 500],
              fitMaxWidth: true,
              placeholderContent: "Search...",
            }}
            instanceRef={(y) => {
              if (y !== null)
                y.events.add("resultselect", function (e: any) {
                  const searchCoords = y.getResponseMetaData().SearchResponse
                    .Point.coordinates as number[];
                  const location = y.getResponseMetaData().SearchRequest
                    .request as string;
                  setCoordinates(searchCoords);
                  setLocation(location);
                });
            }}
          />
        </Map>
      </YMaps>
    </>
  );
};
