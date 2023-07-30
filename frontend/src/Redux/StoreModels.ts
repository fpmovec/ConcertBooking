import { Concert } from "../Models/ConcertModels";
import { Booking } from "../Models/BookingModels";
import { Promocode } from "../Models/Promocode";

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
  promocodes: [{
    code: "CENTAUREA",
    total: 0.9
  },
  {
    code: "CENT19",
    total: 0.9
  },
  {
    code: "INTERSHIP",
    total: 0.85
  },
  {
    code: "CENTTRAINEE",
    total: 0.8
  },
  {
    code: "CENTSOFT",
    total: 0.95
  }]
};
