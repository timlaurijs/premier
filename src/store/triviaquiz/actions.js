export const SET_ANSWER = "SET_ANSWER";

export const setAnswer = (answer) => {
  return {
    type: SET_ANSWER,
    payload: answer,
  };
};

export function setAnswerQuiz(answer) {
  return function thunk(dispatch) {
    console.log(answer);
    dispatch(setAnswer(answer));
  };
}
