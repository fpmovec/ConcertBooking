import { YMaps, Map, Placemark } from "react-yandex-maps";

import { useGlobalContext } from "../../../../Redux/Hooks";
import styles from "./Map.module.css";
import React, { useState } from "react";

export const AdminMap = () => {
  const mapState = {
    center: [53.902735, 27.555696],
    zoom: 11,
  };

  const inputRef = React.useRef(null);
  const [addressCoord, setAddressCoord] = useState<number[]>();
  const [inputValue, setInputValue] = useState<string>("");
  const [savedYMaps, setSavedYMaps] = useState<any>();
  const { setCoordinates, setLocation } = useGlobalContext();

  const onClickAddress = (e: any, ymaps: any) => {
    const name = e.get("item").value as string;
    setInputValue(name);
    setLocation(name);
    ymaps.geocode(name).then((result) => {
      const coord = result.geoObjects
        .get(0)
        .geometry.getCoordinates() as number[];
      setAddressCoord(coord);
      setCoordinates(coord);
    });
  };

  const onYmapsLoad = (ymaps: any) => {
    setSavedYMaps(ymaps);
    const suggestView = new ymaps.SuggestView(inputRef.current);
     suggestView.events.add("select", (e) => {
       return onClickAddress(e, ymaps);
     });
  };

  return (
    <>
      <div className={styles.map_block}>
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <label
            htmlFor="inp"
            style={{
              display: "inline-block",
              width: 210,
            }}
          >
            Location:{" "}
          </label>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            style={{
              width: 350,
            }}
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search..."
            id="inp"
            required
            minLength={4}
          />
        </div>

        <div className={styles.map}>
          <YMaps
          enterprise={true}
            query={{
              apikey: "c5fe99d9-8d5e-4ac7-ab12-b96022fdf8da",
              //apikey: "9e1f9863-433d-4c46-b962-e38338f4ea23",
              load: "package.full",
             
            }}
          >
            <Map
              state={
                addressCoord ? { ...mapState, center: addressCoord } : mapState
              }
              onLoad={onYmapsLoad}
              width={700}
              height={500}
              //modules={["SuggestView"]}
            >
              {addressCoord && <Placemark geometry={addressCoord} />}
            </Map>
          </YMaps>
        </div>
      </div>
    </>
  );
};
