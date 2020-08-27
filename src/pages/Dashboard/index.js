import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

//store items
import { selectUser } from "../../store/user/selectors"

//components
import ChangeUserData from "../../components/ChangeUserData"

//material ui
import { Button, Box, Grid, Paper, sizing } from "@material-ui/core"
import { useStyles } from "./styles.js"

export default function Dashboard() {
  // const { token, name, progress } = useSelector(selectUser);

  const classes = useStyles()

  const user = useSelector(selectUser)
  const [change, setChange] = useState(false)
  const progress = user.progress
  const [level, setLevel] = useState("amoebe")

  useEffect(() => {
    if (progress > 5 && progress <= 10) {
      setLevel("bumblebee")
    } else if (progress > 10 && progress <= 15) {
      setLevel("hamster")
    } else if (progress > 15 && progress <= 20) {
      setLevel("chihuahua")
    } else if (progress > 20 && progress <= 30) {
      setLevel("boar")
    } else if (progress > 30 && progress <= 50) {
      setLevel("tiger")
    } else if (progress > 50 && progress <= 75) {
      setLevel("elephant")
    } else if (progress > 75) {
      setLevel("mammoth")
    }
  })

  if (user.token) {
    return (
      <Box mt={10} overflow="hidden">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Box className={classes.pageTitle}>
              <h1 className={classes.h1}>Welcome, {user.name}!</h1>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box ml={4}>
              <Paper>
                <p>
                  <i>Name</i>
                </p>
                <p>{user.name}</p>
                <p>
                  <i>Email</i>
                </p>
                <p>{user.email}</p>
                <p>
                  <i>Who are you?</i>
                </p>
                <p>{user.description}</p>
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mr={6}>
              <Paper>
                <p>
                  <i>Current level: </i>
                </p>
                <p>{progress}</p>
                <p>
                  <i>Current rank:</i>
                </p>
                <p>{level}</p>
                <Box
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "lightgray",
                  }}
                  p={1}
                  mt={0.5}
                  bottom={0}
                ></Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {!change ? (
              <Box ml={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setChange(true)}
                >
                  Change my information
                </Button>
              </Box>
            ) : (
              <Box ml={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setChange(false)}
                >
                  I'm done changing my information
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box mr={4}>
              <Link to={`/triviaquiz`}>
                <Button variant="contained" color="primary">
                  CS trivia quiz
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link to={`/codinggame`}>
              <Box mr={4}>
                <Button variant="contained" color="primary">
                  Test my coding skills
                </Button>
              </Box>
            </Link>
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
    )
  }
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
