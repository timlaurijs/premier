import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";

import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { CodingGame } from "../store/codinggame/actions";
import { useDispatch, useSelector } from "react-redux";
import { equal } from "../equal";
import { selectExercise } from "../store/codinggame/selector";
import { Box, Button } from "@material-ui/core";

const codeMirrorOptions = {
  theme: "material",
  lineNumbers: true,
  scrollbarStyle: null,
  lineWrapping: true,
};

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

  const [code, setCode] = useState("//enter solution here");
  const exercise =
    "We've got const a = 2 and const b = 5. How can we make sure that we get an output of 10?";

  const testCase = {
    given: "const a = 2; const b = 5;",
    result: "[10]",
  };

  console.log(code);

  const runCode = (testCase) => {
    let submits = [];
    const givenValues = testCase.given;
    console.log(givenValues);
    const codeToRun = `const console = {log(arg) {submits=[...submits,arg];}};
    const document = null;
    const location = null;
    const window = null;
    ${givenValues}
    ${code}
    ;`;
    try {
      eval(codeToRun);
      if (!equal(submits, JSON.parse(testCase.result))) {
        console.log("mistake");
      } else {
        console.log("success!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        return (
          <div key={exercise.id}>
            {" "}
            <h1>{exercise.description}</h1>
            <h3>{exercise.exercise}</h3>
            <h3>{exercise.given}</h3>
            <CodeMirror
              value={exercise.given}
              options={{
                mode: "javascript",
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, js) => {
                setCode(js);
              }}
            />
            <button
              onClick={() => {
                runCode(testCase);
              }}
            >
              Test
            </button>
          </div>
        );
      })}
    </div>
  );
}
