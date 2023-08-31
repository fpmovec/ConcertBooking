//import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import React, { useMemo, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  withYMaps,
} from "react-yandex-maps";
import { useAppSelector, useAppDispatch } from "../../../../Redux/Hooks";
import { setLocation, setCoord } from "../../../../Redux/Slices";

interface Props {
  loc: string;
}

interface PositionedMapProps {
  ymaps?: any;
}

export const MapComponent = ({ loc }: Props) => {
  const PositionedMap: React.FC<PositionedMapProps> = React.memo(
    ({ ymaps }) => {
      const dispatch = useAppDispatch();
      let currCoordinates: number[];
      const { location } = useAppSelector((state) => state.concerts);
      console.log("Positioned Map");
      React.useEffect(() => {
        console.log("Effect Map");
        ymaps.geocode(location).then((result) => {
          currCoordinates = result.geoObjects
            .get(0)
            .geometry.getCoordinates() as number[];
          //setCoordinates(currCoordinates)
          //setCoord(currCoordinates);
          dispatch(setCoord(currCoordinates));
          //setCoordin(currCoordinates);
        });
      }, [location]);
      const coordin = useAppSelector((state) => state.concerts.coord);
      return (
        <Map
          modules={["geocode"]}
          state={{
            center: coordin,
            zoom: 13,
          }}
          width={500}
          height={300}
          options={{
            searchControlProvider: "yandex#search",
            yandexMapDisablePoiInteractivity: true,
          }}
          // instanceRef={(inst) => {
          //   if (inst !== null) {
          //     inst.events.add("click", (e) => {
          //       const coordinates = e.get("coords");
          //       setCoordinates(coordinates);
          //       setCoord(coordinates)
          //     });

          //     }
          //   }
          // }
        >
          {<Placemark geometry={coordin} />}
        </Map>
      );
    }
  );

  const ConnectedMap = useMemo(() => {
    console.log("useMemo");
    return withYMaps(PositionedMap, true, ["geolocation", "geocode"]);
  }, [PositionedMap]);

  const [coord, setCoord1] = React.useState([53.902735, 27.555696]);

  const [currentLocation, setCurrentLocation] = useState<string>("Молодечно");

  return (
    <div>
      <YMaps
        enterprise
        query={{
          apikey: "c5fe99d9-8d5e-4ac7-ab12-b96022fdf8da",
        }}
      >
        <ConnectedMap />
        {/* <Map
          modules={["geocode"]}
          state={{
            center: coord,
            zoom: 11,
          }}
          width={500}
          height={300}
          options={{
            searchControlProvider: "yandex#search",
            yandexMapDisablePoiInteractivity: true,
          }}
          onLoad={(ymaps) => {
            ymaps.geocode("Молодечно").then((result) => {
              const currCoordinates = result.geoObjects
                .get(0)
                .geometry.getCoordinates();
              setCoord(currCoordinates);
              //dispatch(setCoordinates(currCoordinates));
              setCoordin(currCoordinates);
            });
          }}
          // instanceRef={(inst) => {
          //   if (inst !== null) {
          //     inst.events.add("click", (e) => {
          //       const coordinates = e.get("coords");
          //       setCoordinates(coordinates);
          //       setCoord(coordinates)
          //     });

          //     }
          //   }
          // }
        >
          {coord.length > 0 && <Placemark geometry={[coord[0], coord[1]]} />}
        </Map> */}
      </YMaps>
    </div>
  );
};
