
import {
  LOG_OUT,
  LOGIN_SUCCESS,
  UPDATE_SCORE,
  TOKEN_STILL_VALID,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  progress: null,
  email: null,
  description: null,
  imageUrl: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_SCORE:
      return {
        ...state,
        progress: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token)
      return { ...state, ...payload }
    case LOG_OUT:
      localStorage.removeItem("token")
      return { ...initialState, token: null }
    case TOKEN_STILL_VALID:
      return { ...state, ...payload }

    default:
      return state
  }
}
