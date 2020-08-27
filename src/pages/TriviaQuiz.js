// QuestionCard
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux store

import { selectUser } from "../store/user/selectors";
import { selectQuestion } from "../store/questions/selectors";
import { fetchQuestions } from "../store/questions/actions";

// TypesScript types
import { Button, Box, Typography, makeStyles, Grid } from "@material-ui/core";

//MUI components
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import PlayCircleOutlineRoundedIcon from "@material-ui/icons/PlayCircleOutlineRounded";
import QuestionCard from "../components/QuestionCard";

const useStyles = makeStyles({
  root: {
    align: "center",
    width: "100%",
  },
  card: {
    alignItems: "center",
    fontSize: 15,
    square: "false",
  },
  title: {
    padding: 10,
    fontSize: 15,

    fontWeight: "bold",
    // color: "#6BCAE2",
    textAlign: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 25,

    fontWeight: "bold",
  },
});

const Questions = () => {
  const classes = useStyles();

  const [TOTAL_QUESTIONS] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);

  const dispatch = useDispatch();
  const someUser = useSelector(selectUser);
  const someQuestions = useSelector(selectQuestion);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const startTrivia = async () => {
    setGameOver(false);
    setQuestions(someQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
  };

  const checkAnswer = (e) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      console.log(someQuestions);
      const correct = someQuestions[number].correct_answer === answer;

      if (correct) {
        console.log("correct");
        setScore((prev) => prev + 1);
      }
      const answerObject = {
        question: someQuestions[number].question,
        answer,
        correct,
        correctAnswer: someQuestions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  const submitScore = () => {
    setNumber(0);
  };

  return (
    <Box className={classes.title} mt={10}>
      {/* <img
        src={play}
        alt="loading..."
        style={{ width: "400px", height: "400px" }}
      /> */}
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          style={{ marginLeft: "4em", marginRight: "4em", marginTop: "0" }}
        >
          <Typography component="div">
            {!gameOver ? (
              <div style={{ fontSize: 30, color: "red" }}> Score: {score}</div>
            ) : null}
          </Typography>
          {!gameOver && (
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}

          <Box className="primary" mt={1}>
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
              <Button
                startIcon={<PlayCircleOutlineRoundedIcon />}
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={startTrivia}
                style={{
                  width: "250",
                  height: "75px",
                  marginTop: 30,
                  fontSize: 50,
                }}
              >
                Play
              </Button>
            ) : null}
            {number > 0 && userAnswers.length === TOTAL_QUESTIONS ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={submitScore}
              >
                Submit Score
              </Button>
            ) : null}
          </Box>
          <Box>
            {!gameOver &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 ? (
              <Button
                className={classes.button}
                startIcon={<SkipNextRoundedIcon />}
                variant="contained"
                color="primary"
                onClick={nextQuestion}
              >
                Next Question
              </Button>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Box>
  );
};
export default Questions;
