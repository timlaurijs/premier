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

export default function ExerciseCard(props) {
  const [code, setCode] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [output, setOutput] = useState(0);
  const runCode = (exercise) => {
    console.log("exercise resp. given", exercise + props.given);

    let submits = []; //logic is wrong here because of the equals.js logic //we need to change this//Submit does not have the right value.
    const givenValues = props.given;
    const codeToRun = `const console = {log(arg) {submits=[...submits,arg];}};
    const document = null;
    const location = null;
    const window = null;
    ${givenValues}
    ${code}
    ;`;
    try {
      eval(codeToRun);
      if (!equal(submits, JSON.parse(props.answer))) {
        console.log("mistake");
        setTestOutput(`Your code rendered ${submits}. Try again!`);
      } else {
        console.log("success!");
        setOutput(1);
        setTestOutput("Well done!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseScoreOrNot = () => {
    props.callbackScore(output);
    setOutput(0);
    setTestOutput("");
    setCode("");
  };

  console.log(output);

  return (
    <Box p={3} key={props.id}>
      <h3>
        {props.id}.{""} {props.description}
      </h3>
      <p>{props.exercise}</p>
      <p>
        <i>Given: {props.given}</i>
      </p>
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
      <p>{testOutput}</p>
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
          runCode(code);
        }}
      >
        Test
      </Button>
      <Button
        style={{
          marginTop: 20,
          borderRadius: 100,
          fontSize: 20,
        }}
        color="primary"
        variant="contained"
        onClick={increaseScoreOrNot}
      >
        Submit
      </Button>
    </Box>
  );
}
