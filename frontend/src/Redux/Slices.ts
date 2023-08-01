import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialConcertsState } from "./StoreModels";
import { Booking } from "../Models/BookingModels";
import {
  Classic,
  Concert,
  Coordinates,
  OpenAir,
  Party,
} from "../Models/ConcertModels";
import { Promocode } from "../Models/Promocode";

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
    },

    setPromocodes(state, action: PayloadAction<Promocode[]>) {
      state.promocodes = action.payload;
    },

    addPurchase(state, action: PayloadAction<Booking>) {
      state.purchased.push(action.payload);
    },

    addConcert(state, action: PayloadAction<Concert>) {
      state.allConcerts.push(action.payload);
    },

    setConcerts(state, action: PayloadAction<Concert[]>) {
      state.allConcerts = action.payload;
    },

    addClassic(state, action: PayloadAction<Classic>) {
      state.allClassics.push(action.payload);
    },
    addParty(state, action: PayloadAction<Party>) {
      state.allPartys.push(action.payload);
    },
    addOpenAir(state, action: PayloadAction<OpenAir>) {
      state.allOpenAirs.push(action.payload);
    },

    addCoordinates(state, action: PayloadAction<Coordinates>) {
      state.allCoordinates.push(action.payload);
    },

    setClassics(state, action: PayloadAction<Classic[]>) {
      state.allClassics = action.payload;
    },

    setPartys(state, action: PayloadAction<Party[]>) {
      state.allPartys = action.payload;
    },

    setOpenAirs(state, action: PayloadAction<OpenAir[]>) {
      state.allOpenAirs = action.payload;
    },

    setCoordinates(state, action: PayloadAction<Coordinates[]>) {
      state.allCoordinates = action.payload;
    },
  },
});

export const {
  gettingConcert,
  gotConcert,
  searchingConcerts,
  searchedConcerts,
  bookedConcert,
  setCurrentBookingId,
  setBookings,
  setPromocodes,
  addPurchase,
  addConcert,
  setConcerts,
  setClassics,
  setCoordinates,
  setOpenAirs,
  setPartys,
  addClassic,
  addCoordinates,
  addParty,
  addOpenAir
} = concertSlice.actions;

export default concertSlice.reducer;
