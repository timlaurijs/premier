import axios from "axios";

// TypeScript types

export const FETCH_QUESTION = "FETCH_QUESTION";
export const GAME_OVER = "GAME_OVER";

// export const fetchQuestion = {
//     type: FETCH_QUESTION,
//     payload: questions,
// }

export const shuffleArray = (array) =>
  [...array].sort(() => Math.random() - 0.5);

export const questionsFetched = (questions) => ({
  type: FETCH_QUESTION,
  payload: questions,
});

export const fetchQuestions = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=10&category=18"
    );

    const data = res.data.results.map((question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));

    console.log(data);

    dispatch(questionsFetched(data));
  } catch (error) {
    console.log(error);
  }
};
