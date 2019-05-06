import { combineReducers } from "redux";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IReducerType } from "./types";

export const INITIAL_STATE: IReducerType = {};
export const reducer = reducerWithInitialState(INITIAL_STATE);
