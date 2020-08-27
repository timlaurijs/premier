import React, { useState, useEffect } from "react";

//
import ExerciseCard from "../components/ExerciseCard";

import { CodingGame } from "../store/codinggame/actions";
import { updateProgressUser } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectExercise } from "../store/codinggame/selector";
import { Box, Grid, Paper, Button, Typography } from "@material-ui/core";
import AnswerCard from "../components/AnswerCard";

export default function CodingExercises() {
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
    <Box
      mt={10}
      style={{
        fontSize: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 50,
        maxWidth: "100%",
      }}
    >
      <Grid container spacing={10}>
        <Grid item xs={12} style={{ justifyContent: "center" }}>
          <Typography component="div">
            {!gameOver ? (
              <div style={{ fontSize: 30, color: "red" }}> Score: {score}</div>
            ) : null}
          </Typography>
          {/* <h1
            style={{
              maxWidth: 300,
              fontSize: 25,
              margin: 0,
            }}
          >
            Level #1
          </h1> */}
        </Grid>
      </Grid>
      {!gameOver && (
        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            <Paper>
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
          <Grid item xs={12} sm={6}>
            <AnswerCard hint={exercises[number].hint} />
          </Grid>
        </Grid>
      )}
      <Box className="primary" mt={1}>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <Button variant="contained" color="primary" onClick={startGame}>
            Play new game
          </Button>
        ) : null}
        {number > 0 && userAnswers.length === TOTAL_QUESTIONS ? (
          <Button variant="contained" color="secondary" onClick={submitScore}>
            Submit Score
          </Button>
        ) : null}
      </Box>
      <Box>
        {!gameOver && (
          <Button variant="contained" color="primary" onClick={nextQuestion}>
            Next Question
          </Button>
        )}
      </Box>
    </Box>
  );
}
