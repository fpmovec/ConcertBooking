import { configureStore } from "@reduxjs/toolkit";
import concertsReducer from './Slices'

const store = configureStore({
    reducer: {
        concerts: concertsReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
