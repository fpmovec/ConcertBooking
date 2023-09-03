import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialConcertsState } from "./StoreModels";
import { Booking } from "../Models/BookingModels";
import {
  Classic,
  Concert,
  OpenAir,
  Party,
} from "../Models/ConcertModels";
import { Promocode } from "../Models/Promocode";
import { Order } from "../Models/OrderModels";

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

    gotClassicInfo(state, action: PayloadAction<Classic | null>) {
      state.viewingClassic = action.payload;
    },

    gotPartyInfo(state, action: PayloadAction<Party | null>) {
      state.viewingParty = action.payload;
    },

    gotOpenAirInfo(state, action: PayloadAction<OpenAir | null>) {
      state.viewingOpenAir = action.payload;
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

    setBookings(state, action: PayloadAction<Booking[]>) {
      state.booking = action.payload;
    },

    setPromocodes(state, action: PayloadAction<Promocode[]>) {
      state.promocodes = action.payload;
    },

    setPurchases(state, action: PayloadAction<Order[]>) {
      state.purchased = action.payload;
    },

    addConcert(state, action: PayloadAction<Concert>) {
      state.allConcerts.push(action.payload);
    },

    setConcerts(state, action: PayloadAction<Concert[]>) {
      state.allConcerts = action.payload;
    },
    setCoordinates(state, action: PayloadAction<number[]>) {
      state.coordinates = action.payload
    },
  },
});

export const {
  gettingConcert,
  gotConcert,
  searchingConcerts,
  searchedConcerts,
  bookedConcert,
  setBookings,
  setPromocodes,
  setPurchases,
  addConcert,
  setConcerts,
  gotClassicInfo,
  gotOpenAirInfo,
  gotPartyInfo,
  setCoordinates,
} = concertSlice.actions;

export default concertSlice.reducer;
