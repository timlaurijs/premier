import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

//store items
import { selectUser } from "../../store/user/selectors";

//components
import ChangeUserData from "../../components/ChangeUserData";

//material ui
import { Button, Box, Grid, Paper, Fade, Tooltip } from "@material-ui/core";
import { useStyles } from "./styles.js";

export default function Dashboard() {
  // const { token, name, progress } = useSelector(selectUser);

  const classes = useStyles();

  const user = useSelector(selectUser);
  const token = user.token;
  const [change, setChange] = useState(false);
  const progress = user.progress;
  const [level, setLevel] = useState("amoebe");

  const history = useHistory();

  useEffect(() => {
    if (token === null) {
      history.push("/login");
      console.log("I push to");
    }
  }, [token, history]);

  useEffect(() => {
    if (progress > 5 && progress <= 10) {
      setLevel("bumblebee");
    } else if (progress > 10 && progress <= 15) {
      setLevel("hamster");
    } else if (progress > 15 && progress <= 20) {
      setLevel("chihuahua");
    } else if (progress > 20 && progress <= 30) {
      setLevel("boar");
    } else if (progress > 30 && progress <= 50) {
      setLevel("tiger");
    } else if (progress > 50 && progress <= 75) {
      setLevel("elephant");
    } else if (progress > 75) {
      setLevel("mammoth");
    }
  });

  return (
    <Box mt={10} className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Box className={classes.pageTitle}>
            <h1 className={classes.h1}>Welcome, {user.name}!</h1>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={23}>
            <h3>Name: {user.name}</h3>
            <h4>About me: {user.description}</h4>
            <h3>Current level: {level}</h3>
            <h3>Email: {user.email}</h3>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box>
            <Paper elevation={23}>
              <p>
                <i>Current level: </i>
              </p>
              <h3>{progress}</h3>
              <p>
                <i>Current rank:</i>
              </p>
              <h3>{level}</h3>
              <Box
                m={10}
                style={{
                  width: `${progress}%`,
                  backgroundColor: "darkgreen",
                }}
                p={1}
                mt={0.5}
                bottom={0}
              ></Box>
              <Box>
                <h2>Test your knowledge! 🤖</h2>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {!change ? (
            <Paper elevation={23} className={classes.paper}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setChange(true)}
              >
                Change my information
              </Button>
            </Paper>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setChange(false)}
            >
              I'm done changing my information
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box mr={4}>
            <Tooltip
              size="medium"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title={<h1>QUIZ</h1>}
            >
              <Box ml={1}>
                <Button
                  color="primary"
                  arrow="true"
                  size="medium"
                  variant="contained"
                  className={classes.button}
                  component={NavLink}
                  to="/triviaquiz"
                >
                  Computer science Quiz
                </Button>
              </Box>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Tooltip
            size="medium"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={<h1>Coding Game</h1>}
          >
            <Box ml={1}>
              <Button
                color="primary"
                arrow="true"
                size="medium"
                variant="contained"
                className={classes.button}
                component={NavLink}
                to="/codinggame"
              >
                Game
              </Button>
            </Box>
          </Tooltip>
        </Grid>

        {change ? (
          <Grid item xs={12} sm={12}>
            <Box m={4}>
              <ChangeUserData user={user} />
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}

/*
  return (
    <Paper elevation={2}>
      <Box mt={40}>
        <h1>Welcome, {user.name}!</h1>
        {!change ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p>
                <i>Current level: {level}</i>
              </p>
              <Box style={{ width: "50%", backgroundColor: "grey" }}>
                <Box
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "lightgray",
                  }}
                  p={1}
                  my={0.5}
                ></Box>
              </Box>
              <p>What do you want to do today?</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setChange(true)}
              >
                Change my information
              </Button>
            </Grid>
          </Grid>
        ) : (
          <>
            <p>change your information</p>
            <ChangeUserData user={user} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setChange(false)}
            >
              Back to dashboard
            </Button>
          </>
        )}
        {!change ? (
          <>
            <Button variant="contained" color="primary">
              CS trivia quiz
            </Button>
            <Button variant="contained" color="primary">
              Test my coding skills
            </Button>
          </>
        ) : null}
      </Box>
    </Paper>
  );
} else {
  return (
    <div>
      <h3>You need to be logged in!</h3>
      <Link to={`/login`}>
        <button style={{ margin: "20px", borderRadius: "15px" }}>
          Go to Login
        </button>
      </Link>
    </div>
  );
}
*/
