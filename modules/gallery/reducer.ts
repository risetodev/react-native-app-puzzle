import { combineReducers } from "redux";

const INITIAl_STATE = {
  current: [],
  posible: "selectedImage"
};

const puzzleReducer = (state = INITIAl_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  puzzle: puzzleReducer
});
