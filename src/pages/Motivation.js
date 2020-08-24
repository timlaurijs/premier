import React, { useState, useEffect } from "react";
import { API_URL_QUOTES } from "../constants/constants";
import axios from "axios";

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
    <div>
      <h1>
        <i>{inspirationalQuote.text}</i> - {inspirationalQuote.author}
      </h1>
      <button onClick={() => fetchQuote()}>More motivation!</button>
    </div>
  );
}
