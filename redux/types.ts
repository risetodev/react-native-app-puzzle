import React from "react";
import { ImageRequireSource } from "react-native";

export interface IReducerType {
  images: IImage[];
  selectedImage: ImageRequireSource;
}

export interface IImage {
  source: ImageRequireSource;
}
