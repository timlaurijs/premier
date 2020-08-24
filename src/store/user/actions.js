import { apiUrl } from "../../config/constants"
import { selectToken, selectUser } from "./selectors"
import axios from "axios"

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID"
export const LOG_OUT = "LOG_OUT"

export const login = (email, password) => {
  return async (dispatch, getState) => {
    // dispatch(appLoading())
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      })
      dispatch(loginSuccess(response.data))
      // dispatch(appDoneLoading())
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
        // dispatch(setMessage("danger", true, error.response.data.message))
      } else {
        console.log(error.message)
        // dispatch(setMessage("danger", true, error.message))
      }
      // dispatch(appDoneLoading())
    }
  }
}
const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  }
}
export const logOut = () => ({ type: LOG_OUT })

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())
    if (token === null) return
    // dispatch(appLoading())
    try {
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(tokenStillValid(response.data))
      // dispatch(appDoneLoading())
    } catch (error) {
      if (error.response) {
        console.log(error.response.message)
      } else {
        console.log(error)
      }
      dispatch(logOut())
      // dispatch(appDoneLoading())
    }
  }
}

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
})
