import { combineReducers } from "redux"
import user from "./user/reducer"
import triviaquiz from "./triviaquiz/reducer";

export default combineReducers({
    triviaquiz,
    user,
});