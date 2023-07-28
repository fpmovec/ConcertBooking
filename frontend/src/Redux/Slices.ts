import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialConcertsState } from "./StoreModels";
import { Booking } from "../Models/BookingModels";
import { Concert } from "../Models/ConcertModels";

const concertSlice = createSlice({
  name: "concerts",
  initialState: initialConcertsState,
  reducers: {
    gettingConcert(state) {
      state.loading = true;
      state.viewing = null;
    },

    gotConcert(state, action: PayloadAction<Concert | null>) {
      state.loading = false;
      state.viewing = action.payload;
    },

    searchingConcerts(state) {
      state.loading = true;
      state.searching = [];
    },

    searchedConcerts(state, action: PayloadAction<Concert[]>) {
      state.loading = false;
      state.searching = action.payload;
    },

    bookedConcert(state, action: PayloadAction<Booking>) {
      state.booking.push(action.payload);
    },

    setCurrentBookingId(state, action: PayloadAction<number>) {
      state.currentBookingId = action.payload;
    },

    setBookings(state, action: PayloadAction<Booking[]>) {
      state.booking = action.payload;
    }
  },
});

export const {
  gettingConcert,
  gotConcert,
  searchingConcerts,
  searchedConcerts,
  bookedConcert,
  setCurrentBookingId,
  setBookings
} = concertSlice.actions;

export default concertSlice.reducer;
