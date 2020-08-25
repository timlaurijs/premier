import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";

import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Codinggame } from "../store/codinggame/actions";
import { useDispatch } from "react-redux";
import { equal } from "../equal";

const codeMirrorOptions = {
  theme: "material",
  lineNumbers: true,
  scrollbarStyle: null,
  lineWrapping: true,
};

export default function CodingGame() {
  const dispatch = useDispatch();
  console.log("dispatch codinggame");

  //Dispatch the action for coding game:

  const addGameOnClick = (e) => {
    e.preventDefault();
    dispatch(Codinggame());
  };

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

  return (
    <div>
      <h3>{exercise}</h3>
      <CodeMirror
        value={code}
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
}
