import { API_DATABASE } from "../../constants/constants";
import axios from "axios";
export const LOAD_EXERCISE = "ADD_TEST_CASE";
export const CodinggameFetchAll = (exercises) => {
  return {
    type: "ADD_TEST_CASE",
    payload: exercises,
  };
};

export function CodingGame() {
  return async function thunk(dispatch, getState) {
    try {
      const data = await axios.get(`${API_DATABASE}/exercise`);
      console.log(data);
      dispatch(CodinggameFetchAll(data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
}
