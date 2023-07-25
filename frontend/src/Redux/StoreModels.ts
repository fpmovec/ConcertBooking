import { Concert } from "../Models/ConcertModels";

interface ConcertsState {
  readonly loading: boolean;
  readonly viewing: Concert | null;
}

export interface AppState {
  readonly concerts: ConcertsState;
}

export const initialConcertsState: ConcertsState = {
  loading: false,
  viewing: null,
};
