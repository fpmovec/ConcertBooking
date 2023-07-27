import { Concert } from "../Models/ConcertModels";
import { Booking } from "../Models/BookingModels";

interface ConcertsState {
  readonly loading: boolean;
  readonly viewing: Concert | null;
  readonly searching: Concert[];
  readonly booking: Booking[];
  readonly currentBookingId: number;
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
};
