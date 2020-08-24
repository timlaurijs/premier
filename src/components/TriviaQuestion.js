import React, { useState } from "react";
import { setAnswerQuiz } from "../store/triviaquiz/actions";
import { useDispatch } from "react-redux";

export default function TriviaQuestion(props) {
  const [answer, setAnswer] = useState(null);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{props.question}</h3>
      <div>
        <input
          type="radio"
          id="true"
          value={"true"}
          checked={answer === "true"}
          onChange={() => dispatch(setAnswerQuiz("true"))}
        />
        True
        <input
          type="radio"
          id="false"
          value={"false"}
          checked={answer === "false"}
          onChange={() => dispatch(setAnswerQuiz("false"))}
        />
        False
      </div>
    </div>
  );
}
