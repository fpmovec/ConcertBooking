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
  },
});


export const { gettingConcert, gotConcert } = concertSlice.actions;

export default concertSlice.reducer;
