import React from "react";

export interface IReducerType {
  images: IImage[];
  selectedImage: React.ReactNode;
}

export interface IImage {
  imageComponent: React.ReactNode;
  source: string;
}
