import { SET_ANSWER } from "./actions";

const initialState = {
  answers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWER: {
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    }
    default:
      return state;
  }
};
