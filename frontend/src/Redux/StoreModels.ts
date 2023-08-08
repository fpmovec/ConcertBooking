import { Classic, Concert, Coordinates, OpenAir, Party } from "../Models/ConcertModels";
import { Booking } from "../Models/BookingModels";
import { Promocode } from "../Models/Promocode";
import { getInitialPromocodes, getInitialConcerts, getInitialClassics, getInitialPartys, getInitialOpenAirs, getInitialCoordinates } from "../Models/MockData";

interface ConcertsState {
  readonly loading: boolean;
  readonly viewing: Concert | null;
  readonly viewingParty: Party | null;
  readonly viewingClassic: Classic | null;
  readonly viewingOpenAir: OpenAir | null;
  readonly searching: Concert[];
  readonly booking: Booking[];
  readonly currentBookingId: number;
  readonly promocodes: Promocode[];
  readonly purchased: Booking[];
  readonly allConcerts: Concert[];
  readonly viewingCoordinates: Coordinates | null;
  //readonly allClassics: Classic[];
  //readonly allPartys: Party[];
  //readonly allOpenAirs: OpenAir[];
  //readonly allCoordinates: Coordinates[];
}

export interface AppState {
  readonly concerts: ConcertsState;
}

export const initialConcertsState: ConcertsState = {
  loading: false,
  viewing: null,
  searching: [],
  booking: [],
  currentBookingId: 1,
  promocodes: getInitialPromocodes(),
  purchased: [],
  allConcerts: [],
  //allClassics: getInitialClassics(),
  //allPartys: getInitialPartys(),
  //allOpenAirs: getInitialOpenAirs(),
  //allCoordinates: getInitialCoordinates(),
  viewingClassic: null,
  viewingParty: null,
  viewingOpenAir: null,
  viewingCoordinates: null
};
