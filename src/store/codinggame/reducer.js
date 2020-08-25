const initialState = {
  exercise: [],
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
