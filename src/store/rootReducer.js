import { combineReducers } from "redux";
import user from "./user/reducer";
import triviaquiz from "./triviaquiz/reducer";
import codingGameReducer from "./codinggame/reducer";

export default combineReducers({
  triviaquiz,
  user,
  codingGameReducer,
});
