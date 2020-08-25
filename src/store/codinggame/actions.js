export const LOAD_EXERCISE = "ADD_TEST_CASE";
export function Codinggame(exercise) {
  return {
    type: "ADD_TEST_CASE",
    payload: exercise, //this is what we are sending in the action
  };
}
