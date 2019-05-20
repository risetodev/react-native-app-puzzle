import { IImage } from "../../redux";
import { RouteComponentProps } from "react-router";
import { ImageRequireSource } from "react-native";

export interface IStateProps {
  images: IImage[];
}

export interface IDispatchProps {
  onSelectImage: (uri: ImageRequireSource) => void;
}

export interface IProps
  extends IDispatchProps,
    IStateProps,
    RouteComponentProps<{}> {}
