import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialConcertsState } from "./StoreModels";
import { Classic, Party, OpenAir } from "../Models/ConcertModels";

const concertSlice = createSlice({
  name: "concerts",
  initialState: initialConcertsState,
  reducers: {
    gettingConcert(state, action: PayloadAction<void>) {
      state.loading = true;
      state.viewing = null;
    },

    gotConcert(state, action: PayloadAction<Party | Classic | OpenAir | null>) {
      state.loading = false;
      state.viewing = action.payload;
    },
  },
});


export const { gettingConcert, gotConcert } = concertSlice.actions;

export default concertSlice.reducer;
