import { combineReducers } from "redux";

import sends from "./sends/reducer";

const coreReducers = {
  sends,
};

export default combineReducers(coreReducers);
