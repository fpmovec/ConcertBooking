import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialConcertsState } from "./StoreModels";
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
  },
});

export const {
  gettingConcert,
  gotConcert,
  searchingConcerts,
  searchedConcerts,
} = concertSlice.actions;

export default concertSlice.reducer;
