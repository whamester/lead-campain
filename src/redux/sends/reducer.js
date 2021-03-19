import { SENDS } from "../types";

const initialState = {
  selectedCategories: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SENDS.CLIENT_BY_CATEGORES:
      return {
        ...state,
        selectedCategories: action.data,
      };

    default:
      return state;
  }
};
