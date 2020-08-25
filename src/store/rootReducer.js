import { combineReducers } from "redux";
import user from "./user/reducer";
import questions from "./questions/reducer";

export default combineReducers({
  questions,
  user,
});
