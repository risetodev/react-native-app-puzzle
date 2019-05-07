import { IImage } from "../../redux";

export interface IStateProps {
  images: IImage[];
}
export interface IDispatchProps {
  onSelectImage: (image: string) => void;
}
export interface IProps extends IDispatchProps, IStateProps {}
