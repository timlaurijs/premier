// TypeScript types
import { FETCH_QUESTION } from "./actions.js";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION:
      return [...action.payload];

    default:
      return state;
  }
};
