import React from "react";

export interface IReducerType {
  images: IImage[];
  selectedImage: string;
}

export interface IImage {
  imageComponent: React.ReactNode;
  source: string;
}
