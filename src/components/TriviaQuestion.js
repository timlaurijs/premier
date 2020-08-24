import React, { useState } from "react";

export default function TriviaQuestion(props) {
  const [answer, setAnswer] = useState(false);

  return (
    <div>
      <h3>{props.question}</h3>
      <form>
        {" "}
        <div>
          <input
            type="radio"
            id="true"
            value={true}
            checked={() => setAnswer(true)}
          />
          True
          <input
            type="radio"
            id="false"
            value={false}
            checked={() => setAnswer(false)}
          />
          False
        </div>
      </form>
    </div>
  );
}
