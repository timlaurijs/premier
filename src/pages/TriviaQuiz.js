import React, { useState } from "react";
import TriviaQuestion from "../components/TriviaQuestion";
import axios from "axios";
import { API_URL_TRIVIA_QUIZ } from "../constants/constants";
import { Button } from "@material-ui/core";

export default function TriviaQuiz() {
  const [tenQuestions, setTenQuestions] = useState([]);

  const startNewQuiz = async () => {
    const data = await axios.get(API_URL_TRIVIA_QUIZ);
    const tenTriviaQuestions = data.data.results;
    console.log(tenTriviaQuestions);
    setTenQuestions(tenTriviaQuestions);
  };

  return (
    <div>
      <h1>Let's test your CS knowledge!</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => startNewQuiz()}
      >
        Start a new quiz
      </Button>
      {tenQuestions.map((question, index) => {
        return <TriviaQuestion key={index} question={question.question} />;
      })}
    </div>
  );
}
