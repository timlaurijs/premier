import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import { Controlled as CodeMirror } from "react-codemirror2";
import { equal } from "../equal";
import { Box, Button } from "@material-ui/core";
import ComputerIcon from "@material-ui/icons/Computer";

const codeMirrorOptions = {
  theme: "material",
  lineNumbers: true,
  scrollbarStyle: null,
  lineWrapping: true,
};

export default function QuestionCard({ exercise }) {
  console.log("what is exercise given", exercise.given);
  const [code, setCode] = useState(exercise.given);
  console.log("what is CODE", code);
  const runCode = (exercise) => {
    console.log("exercise", exercise);

    let submits = []; //logic is wrong here because of the equals.js logic //we need to change this//Submit does not have the right value.
    const givenValues = exercise.given;
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
      if (!equal(submits, JSON.parse(exercise.answer))) {
        console.log("success");
      } else {
        console.log("mistake!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={3} key={exercise.id}>
      {" "}
      <h3>
        {exercise.id}.{""} {exercise.description}
      </h3>
      <p>{exercise.exercise}</p>
      <p>{exercise.given}</p>
      <CodeMirror
        value={code}
        options={{
          mode: "javascript",
          ...codeMirrorOptions,
        }}
        onBeforeChange={(editor, data, js) => {
          console.log("js", js);
          setCode(js);
        }}
      />
      <Button
        endIcon={<ComputerIcon />}
        style={{
          marginTop: 20,
          borderRadius: 100,
          fontSize: 20,
        }}
        color="primary"
        variant="contained"
        onClick={() => {
          runCode(exercise);
        }}
      >
        {" "}
        Test
      </Button>
    </Box>
  );
}
