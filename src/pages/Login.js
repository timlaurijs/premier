import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Redux store
import { login } from "../store/user/actions";
import { selectToken } from "../store/user/selectors";

//Mui components
import { Button, Box } from "@material-ui/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  const formHandler = (event) => {
    event.preventDefault();
    console.log(`email: ${email}, password: ${password}`);
    dispatch(login(email, password));
  };
  return (
    <Box mt={10} style={{ fontSize: 25 }}>
      <div className="Login">
        <form onSubmit={formHandler}>
          <label htmlFor="email"> Email </label>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email"
            name="email"
          ></input>
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
            name="password"
          ></input>
          <Button variant="contained" color="primary" type="submit">
            {" "}
            Submit
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Login;
