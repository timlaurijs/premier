import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { useHistory } from "react-router-dom";
import { signUp } from "../store/user/actions";
import { Box } from "@material-ui/core";

const SignUp = () => {
  const [name, setName] = useState("");
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
    console.log(`name: ${name}, email: ${email}, password: ${password}`);
    dispatch(signUp(name, email, password));
  };

  return (
    <Box mt={10} style={{ fontSize: 25 }}>
      <div className="SignUp">
        <form onSubmit={formHandler}>
          <label htmlFor="name"> Name </label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="name"
            name="name"
          ></input>
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
          <button type="submit"> Submit</button>
        </form>
      </div>
    </Box>
  );
};

export default SignUp;
