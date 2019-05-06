import * as gallery from "./gallery";
import * as puzzle from "./puzzle";
import { combineReducers } from "redux";
import { Reducer } from "redux";

export interface IRootReducer {
  gallery: gallery.IReducerType;
  puzzle: puzzle.IReducerType;
}

// export const ROOT_INITIAL_STATE: IRootReducer = {
//   gallery: gallery.INITIAL_STATE,
//   puzzle: puzzle.INITIAL_STATE
// };

export const rootReducer: Reducer<IRootReducer> = combineReducers<IRootReducer>(
  {
    gallery: gallery.reducer,
    puzzle: puzzle.reducer
  }
);
