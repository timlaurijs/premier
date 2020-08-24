import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Motivation from "./pages/Motivation";
import TriviaQuiz from "./pages/TriviaQuiz";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/motivation" component={Motivation} />
        <Route path="/triviaquiz" component={TriviaQuiz} />
      </Switch>
    </div>
  );
}

export default App;
