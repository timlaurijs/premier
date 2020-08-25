const initialState = {
  exercise: [
    "What is the value of b after console.log?",
    "what is the correct data type for null",
  ],
};

export default function codingGameReducer(
  state = initialState,
  { type, payload }
) {
  console.log("Coding game", payload);
  switch (type) {
    case "ADD_TEST_CASE": {
      return {
        ...state,
        exercise: payload,
      };
    }

    default: {
      return state;
    }
  }
}
