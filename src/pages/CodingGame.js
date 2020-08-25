import ExerciseCard from "../components/ExerciseCard";

import React, { useState, useEffect } from "react";
import { CodingGame } from "../store/codinggame/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectExercise } from "../store/codinggame/selector";
import { Box, Button } from "@material-ui/core";

export default function CodingExercises() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercise);
  console.log("dispatch codinggame");
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(1);
  const [gameOver, setGameOver] = useState(true);
  const TOTAL_QUESTIONS = 1;
  //Dispatch the action for coding game:

  useEffect(() => {
    dispatch(CodingGame());
  }, []);

  const startGame = async () => {
    setQuestions(exercises);
  };

  console.log(questions);

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setNumber(nextQ);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div>
      <Button
        // startIcon={<PlayCircleOutlineRoundedIcon />}
        variant="contained"
        color="primary"
        onClick={startGame}
      >
        Play
      </Button>

      {exercises.map((exercise) => {
        return <ExerciseCard exercise={exercise} />;
      })}
    </div>
  );
}
