//import { YMaps, Map, Placemark, SearchControl } from "@pbe/react-yandex-maps";
import React, { useMemo, useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  withYMaps,
  FullscreenControl,
} from "react-yandex-maps";
import { useAppSelector, useAppDispatch } from "../../../../Redux/Hooks";
import { setLocation, setCoord } from "../../../../Redux/Slices";
import { useActions } from "../../../../Redux/Hooks";
import { useGlobalContext } from "../../../../Redux/Hooks";
import styles from "../AddConcertPage.module.css";

interface Props {
  location: string;
}

export const MapComponent = () => {
  //const [currentCoordinates, setCurrentCoordinates] = useState<number[]>([53.902735, 27.555696]);

  //let currCoordinates: number[] = coordinates;
  //  const PositionedMap: React.FC<PositionedMapProps> = React.memo(
  //   ({ ymaps }) => {
  //    const { coordinates, setCoordinates } = useGlobalContext()
  //     console.log("Positioned Map");
  //     const [coord, setCoord] = useState(coordinates);
  //     React.useEffect(() => {

  //       console.log("Effect Map");
  //       ymaps.geocode(location).then((result) => {
  //        const currCoordinates = result.geoObjects
  //           .get(0)
  //           .geometry.getCoordinates() as number[];
  //           console.log(currCoordinates)
  //           //(currCoordinates) => setCoordinates(currCoordinates)
  //          //setCoordinates(currCoordinates);

  //       });

  //       //setCoordinates(currCoordinates);
  //     }, [location]);

  //     //const coordin = useAppSelector((state) => state.concerts.coord);
  //     return (
  //       <Map
  //         modules={["geocode"]}
  //         state={{
  //           center: coordinates,
  //           zoom: 13,
  //         }}
  //         width={500}
  //         height={300}
  //         options={{
  //           searchControlProvider: "yandex#search",
  //           yandexMapDisablePoiInteractivity: true,
  //         }}
  //         // instanceRef={(inst) => {
  //         //   if (inst !== null) {
  //         //     inst.events.add("click", (e) => {
  //         //       const coordinates = e.get("coords");
  //         //       setCoordinates(coordinates);
  //         //       setCoord(coordinates)
  //         //     });

  //         //     }
  //         //   }
  //         // }
  //       >
  //         <Placemark geometry={coordinates} />
  //       </Map>
  //     );
  //   }
  // );

  // const ConnectedMap = useMemo(() => {
  //   console.log("useMemo");
  //   return withYMaps(PositionedMap, true, ["geolocation", "geocode"]);
  // }, [PositionedMap]);
  //dispatch(setCoord(coord));
  //const [maps, setM] = useState<YMapsApi | null>(null);

  // const addSearchControlEvents = () => {
  //   const ymap = map.current;
  //   const yandexMaps = ymaps.current;

  //   const searchControl = new yandexMaps.control.SearchControl({
  //     options: {
  //       float: "left",
  //       floatIndex: 300,
  //       provider: "yandex#search",
  //       geoObjectStandardPreset: "islands#blueDotIcon",
  //       placeholderContent: "Поиск мест и адресов",
  //       maxWidth: 320,
  //       size: "large"
  //     }
  //   });

  //     ymap.controls.add(searchControl);
  //     searchControl.events.add("resultselect", function (e: any) {
  //       const searchCoords = searchControl.getResponseMetaData().SearchResponse
  //         .Point.coordinates;
  //       const display: string = searchControl.getResponseMetaData().SearchResponse
  //         .display;

  //         console.log(searchControl.getResponseMetaData());
  //     });
  //   }
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
          // onLoad={(ymaps) => {
          //   ymaps.geocode("Молодечно").then((result) => {
          //     const currCoordinates = result.geoObjects
          //       .get(0)
          //       .geometry.getCoordinates();
          //     setCoord(currCoordinates);
          //     //dispatch(setCoordinates(currCoordinates));
          //     setCoordin(currCoordinates);
          //   });
          // }}
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
                    setCoordinates(searchCoords.reverse());
                    setLocation(location);
                });
            }}
          />
        </Map>
      </YMaps>
    </>
  );
};
