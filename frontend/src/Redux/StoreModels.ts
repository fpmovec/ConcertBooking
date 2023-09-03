import { Classic, Concert, OpenAir, Party } from "../Models/ConcertModels";
import { Booking } from "../Models/BookingModels";
import { Promocode } from "../Models/Promocode";
import { Order } from "../Models/OrderModels";

interface ConcertsState {
  readonly loading: boolean;
  readonly viewing: Concert | null;
  readonly viewingParty: Party | null;
  readonly viewingClassic: Classic | null;
  readonly viewingOpenAir: OpenAir | null;
  readonly searching: Concert[];
  readonly booking: Booking[];
  readonly promocodes: Promocode[];
  readonly purchased: Order[];
  readonly allConcerts: Concert[];
  readonly coordinates: number[];
}

export interface AppState {
  readonly concerts: ConcertsState;
}

export const initialConcertsState: ConcertsState = {
  loading: false,
  viewing: null,
  searching: [],
  booking: [],
  promocodes: [],
  purchased: [],
  allConcerts: [],
  viewingClassic: null,
  viewingParty: null,
  viewingOpenAir: null,
  coordinates: [],
};
