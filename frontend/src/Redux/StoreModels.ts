import { Party, Classic, OpenAir } from "../Models/ConcertModels";

interface ConcertsState {
  readonly loading: boolean;
  readonly viewing: Party | Classic | OpenAir | null;
}

export interface AppState {
  readonly concerts: ConcertsState;
}

export const initialConcertsState: ConcertsState = {
  loading: false,
  viewing: null,
};
