import actionCreatorFactory from "typescript-fsa";
const actionCreator = actionCreatorFactory();

export const onSelectImage = actionCreator<string>("SELECT_IMAGE");
