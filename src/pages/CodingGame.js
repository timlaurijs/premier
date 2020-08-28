import React, { useState, useEffect } from "react";

import { API_URL_QUOTES } from "../constants/constants";
import axios from "axios";
import ExerciseCard from "../components/ExerciseCard";

import { CodingGame } from "../store/codinggame/actions";
import { updateProgressUser } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectExercise } from "../store/codinggame/selector";
import {
  Box,
  Grid,
  Paper,
  Button,
  Typography,
  makeStyles,
  Slide,
  Snackbar,
} from "@material-ui/core";
import AnswerCard from "../components/AnswerCard";

import { createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(20),
    },
    paper: {
      padding: theme.spacing(20),
      textAlign: "center",
    },
    buttonStart: {
      borderRadius: 100,
      fontSize: 10,
      backgroundColor: "#629632",
      margin: 10,
      fontWeight: "bold",
      "&:hover": {
        color: "yellow",
        background: "#397D02",
      },
    },
  })
);
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min));
}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function CodingExercises() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);

  const loggedinUser = useSelector(selectUser);
  const exercises = useSelector(selectExercise);
  const TOTAL_QUESTIONS = exercises.length;

  const upLiftedScore = (increment) => {
    setScore((prev) => prev + increment);
  };

  //Motivational quotes
  const [transition, setTransition] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [inspirationalQuote, setInspirationalQuote] = useState({
    text: "",
    author: "",
  });
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchQuote() {
      const data = await axios.get(API_URL_QUOTES);
      const randomNumber = getRandomNumber(1, 1643);
      const randomQuote = data.data[randomNumber];
      setInspirationalQuote({ ...inspirationalQuote, ...randomQuote });
    }
    fetchQuote();
  }, []);

  useEffect(() => {
    dispatch(CodingGame());
  }, [dispatch]);

  const startGame = async () => {
    setGameOver(false);
    setQuestions(exercises);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      dispatch(updateProgressUser(score, loggedinUser.id));
      setNumber(nextQ);
    }
  };

  const submitScore = () => {
    setNumber(0);
  };

  return (
    <Box mt={10} className={classes.root}>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClick(TransitionDown)}
      >
        Get motivated
      </Button>
      <Grid item xs={12}>
        <Snackbar
          className={classes.paper}
          style={{ fontSize: 100 }}
          open={open}
          onClose={handleClose}
          TransitionComponent={transition}
          message={
            <Box>
              <h1>{inspirationalQuote.text}</h1>
              <div>
                {inspirationalQuote.author ? (
                  <p>- {inspirationalQuote.author}</p>
                ) : null}
              </div>
            </Box>
          }
          key={transition ? transition.name : ""}
        />
      </Grid>

      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Typography component="div">
            {!gameOver ? (
              <div style={{ fontSize: 30, color: "red" }}> Score: {score}</div>
            ) : null}
          </Typography>
        </Grid>
      </Grid>
      {!gameOver && (
        <Grid container spacing={10}>
          <Grid item xs={12} sm={9}>
            <Paper elevation={23}>
              <ExerciseCard
                id={exercises[number].id}
                exercise={exercises[number].exercise}
                description={exercises[number].description}
                given={exercises[number].given}
                answer={exercises[number].answer}
                callbackScore={upLiftedScore}
                stateScore={score.score}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper elevation={23}>
              <AnswerCard hint={exercises[number].hint} />
            </Paper>
          </Grid>
        </Grid>
      )}
      <Box className="primary" mt={1}>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <Button
            className={classes.buttonStart}
            variant="contained"
            color="primary"
            onClick={startGame}
          >
            Play new game
          </Button>
        ) : null}
        {number > 0 && userAnswers.length === TOTAL_QUESTIONS ? (
          <Button
            elevation={23}
            className={classes.buttonStart}
            variant="contained"
            color="secondary"
            onClick={submitScore}
          >
            Submit Score
          </Button>
        ) : null}
      </Box>
      <Box>
        {!gameOver && (
          <Button
            className={classes.buttonStart}
            variant="contained"
            color="primary"
            onClick={nextQuestion}
          >
            Next Question
          </Button>
        )}
      </Box>
    </Box>
  );
}
