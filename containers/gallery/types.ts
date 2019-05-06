import React from "react";

export interface IStateProps {
  images: React.ReactNode[];
}
export interface IDispatchProps {}
export interface IProps extends IDispatchProps, IStateProps {}
