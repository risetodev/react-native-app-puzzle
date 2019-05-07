import React from "react";
import actionCreatorFactory from "typescript-fsa";
import { IImage } from "./types";
const actionCreator = actionCreatorFactory();

export const onSelectImage = actionCreator<IImage>("SELECT_IMAGE");
