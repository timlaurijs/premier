export const SET_ANSWER = "SET_ANSWER";

export const setAnswer = () => {
  return {
    type: SET_ANSWER,
  };
};

export function fetchTripsUser(answer) {
  return function thunk(dispatch) {
    dispatch(setAnswer(answer));
  };
}
