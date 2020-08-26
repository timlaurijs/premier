import React, { useState, useEffect } from "react";
import { API_URL_QUOTES } from "../constants/constants";
import axios from "axios";
import { Button, Box } from "@material-ui/core";

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min));
}

export default function Motivation() {
  const [inspirationalQuote, setInspirationalQuote] = useState({
    text: "",
    author: "",
  });

  async function fetchQuote() {
    const data = await axios.get(API_URL_QUOTES);
    const randomNumber = getRandomNumber(1, 1643);
    const randomQuote = data.data[randomNumber];
    setInspirationalQuote({ ...inspirationalQuote, ...randomQuote });
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Box mt={10} style={{ fontSize: 25 }}>
      <h1>
        <i>{inspirationalQuote.text}</i> - {inspirationalQuote.author}
      </h1>
      <Button variant="contained" color="primary" onClick={() => fetchQuote()}>
        More motivation!
      </Button>
    </Box>
  );
}
