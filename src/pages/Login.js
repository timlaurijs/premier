import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

// Redux store
import { login } from "../store/user/actions"
import { selectToken } from "../store/user/selectors"

//Mui components
import { Button, Box, TextField } from "@material-ui/core"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const history = useHistory()

  useEffect(() => {
    if (token !== null) {
      history.push("/")
    }
  }, [token, history])

  const formHandler = (event) => {
    event.preventDefault()
    console.log(`email: ${email}, password: ${password}`)
    dispatch(login(email, password))
  }
  return (
    <Box mt={10}>
      <div className="Login">
        <form
          onSubmit={formHandler}
          style={{ marginTop: "10%", marginLeft: "5%" }}
        >
          {/* <div style={{ display: "block" }}> */}
          {/* <label htmlFor="email" style={{ marginRight: 10 }}>
            {" "}
            Email{" "}
          </label> */}
          <TextField
            type="email"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />

          {/* <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email"
            name="email" 
          ></input> */}
          {/* </div> */}
          {/* <div style={{ display: "block" }}> */}
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />

          {/* <label htmlFor="password"> Password </label>

            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              name="password"
            ></input>
          </div> */}
          <Button variant="contained" color="primary" type="submit">
            {" "}
            Submit
          </Button>
        </form>
      </div>
    </Box>
  )
}

export default Login
