import React from "react";
import { IImage } from "../../redux/gallery";

export interface IStateProps {
  images: IImage[];
}
export interface IDispatchProps {}
export interface IProps extends IDispatchProps, IStateProps {}
