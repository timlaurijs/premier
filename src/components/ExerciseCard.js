import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import { Controlled as CodeMirror } from "react-codemirror2";
import { equal } from "../equal";

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
        console.log("mistake");
      } else {
        console.log("success!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={exercise.id}>
      {" "}
      <h1>{exercise.description}</h1>
      <h3>{exercise.exercise}</h3>
      <h3>{exercise.given}</h3>
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
      <button
        onClick={() => {
          runCode(exercise);
        }}
      >
        Test
      </button>
    </div>
  );
}
