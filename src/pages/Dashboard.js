import React from "react";
import { Button } from "@material-ui/core";

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome, logged in username!</h1>
      <p>What do you want to do today?</p>
      <Button variant="contained" color="primary">
        Motivate me!
      </Button>
      <Button variant="contained" color="primary">
        CS trivia quiz
      </Button>
      <Button variant="contained" color="primary">
        Test my coding skills
      </Button>
    </div>
  );
}
