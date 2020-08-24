import React from "react";
import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
