import actionCreatorFactory from "typescript-fsa";
const actionCreator = actionCreatorFactory();
import { ImageRequireSource } from "react-native";

export const onSelectImage = actionCreator<ImageRequireSource>("SELECT_IMAGE");
