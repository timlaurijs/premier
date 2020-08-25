import { combineReducers } from "redux"
import user from "./user/reducer"
import appState from "./appState/reducer"
import questions from "./questions/reducer";
import codingGameReducer from "./codinggame/reducer"

export default combineReducers({
  questions,
  appState,
  user,
  codingGameReducer,
})
