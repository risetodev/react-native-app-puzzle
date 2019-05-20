import { IImage } from "../../redux";
import { ImageRequireSource } from "react-native";

export interface IStateProps {
  selectedImage: ImageRequireSource;
}

export interface IDispatchProps {}

export interface IProps extends IDispatchProps, IStateProps {}
