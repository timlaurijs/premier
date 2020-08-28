import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Redux store
import { login } from "../store/user/actions";
import { selectToken } from "../store/user/selectors";

//Mui components
import { Button, Box, TextField, Grid, Paper } from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(7),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
    },
  })
);

const Login = () => {
  const classes = useStyles();
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
    <Box mt={10} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={23} className={classes.paper}>
            <h1>Welcome to Premier Coding!</h1>
            <h2>Who are we?</h2>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper Paper elevation={23} className={classes.paper}>
            <form onSubmit={formHandler}>
              <h1>Login</h1>
              {/* <div style={{ display: "block" }}> */}
              {/* <label htmlFor="email" style={{ marginRight: 10 }}>
            {" "}
            Email{" "}
          </label> */}
              <TextField
                type="email"
                id="outlined-basic"
                label="Email"
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
