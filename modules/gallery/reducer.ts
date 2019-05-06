import { combineReducers } from "redux";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IReducerType } from "./types";
import {
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10
} from "../../components/images";

export const INITIAL_STATE: IReducerType = {
  images: [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10
  ]
};
export const reducer = reducerWithInitialState(INITIAL_STATE);
