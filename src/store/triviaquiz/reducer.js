import { SET_ANSWER } from "./actions";

const initialState = {
  answers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWER: {
      const { answer } = action.payload;
      return {
        ...state,
        answers: [...answer],
      };
    }
    default:
      return state;
  }
};
