import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IReducerType, IImage } from "./types";
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
} from "../components/images";
import * as actions from "./actions";

export const INITIAL_STATE: IReducerType = {
  images: [
    { imageComponent: Image1, source: "1.jpg" },
    { imageComponent: Image2, source: "2.jpg" },
    { imageComponent: Image3, source: "3.jpg" },
    { imageComponent: Image4, source: "4.jpg" },
    { imageComponent: Image5, source: "5.jpg" },
    { imageComponent: Image6, source: "6.jpg" },
    { imageComponent: Image7, source: "7.jpg" },
    { imageComponent: Image8, source: "8.jpg" },
    { imageComponent: Image9, source: "9.jpg" },
    { imageComponent: Image10, source: "10.jpg" }
  ],
  selectedImage: null
};

export const reducer = reducerWithInitialState(INITIAL_STATE).case(
  actions.onSelectImage,
  (state: IReducerType, payload: IImage) => ({
    ...state,
    selectedImage: payload
  })
);
