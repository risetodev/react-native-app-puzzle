import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IReducerType } from "./types";
import * as actions from "./actions";

export const INITIAL_STATE: IReducerType = {
  images: [
    { source: require("../assets/images/1.jpg") },
    { source: require("../assets/images/2.jpg") },
    { source: require("../assets/images/3.jpg") },
    { source: require("../assets/images/4.jpg") },
    { source: require("../assets/images/5.jpg") },
    { source: require("../assets/images/6.jpg") },
    { source: require("../assets/images/7.jpg") },
    { source: require("../assets/images/8.jpg") },
    { source: require("../assets/images/9.jpg") },
    { source: require("../assets/images/10.jpg") },
    { source: require("../assets/images/11.jpg") },
    { source: require("../assets/images/12.jpg") },
    { source: require("../assets/images/13.jpg") },
    { source: require("../assets/images/14.jpg") }
  ],
  selectedImage: null
};

export const reducer = reducerWithInitialState(INITIAL_STATE).case(
  actions.onSelectImage,
  (state: IReducerType, payload: string) => ({
    ...state,
    selectedImage: payload
  })
);
