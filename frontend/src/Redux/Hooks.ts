import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./Store";
import { createContext, useContext } from "react";


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type GlobalContent = {
  coordinates: number[];
  location: string;
  setCoordinates: (value: number[]) => void;
  setLocation: (value: string) => void;
}

export const MyGlobalContext = createContext<GlobalContent>({
  coordinates: [53.902735, 27.555696],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCoordinates: () => {},
  location: "Минск",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLocation: () => {}
  })
  export const useGlobalContext = () => useContext(MyGlobalContext)
