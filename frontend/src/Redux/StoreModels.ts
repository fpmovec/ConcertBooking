import { Concert } from "../Models/ConcertModels";
import { Booking } from "../Models/BookingModels";
import { Promocode } from "../Models/Promocode";
import { getInitialPromocodes } from "../Models/MockData";

interface ConcertsState {
  readonly loading: boolean;
  readonly viewing: Concert | null;
  readonly searching: Concert[];
  readonly booking: Booking[];
  readonly currentBookingId: number;
  readonly promocodes: Promocode[];
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
  promocodes: getInitialPromocodes()
};
