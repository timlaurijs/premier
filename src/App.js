import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Motivation from "./pages/Motivation";
import TriviaQuiz from "./pages/TriviaQuiz";
import { getUserWithStoredToken } from "./store/user/actions";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#3b5998",
      dark: "#f3ca20",
    },
    type: "light",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#f3ca20",
      dark: "#6BCAE2",
    },
    type: "dark",
  },
});

function App() {
  const [darkMode, set_darkMode] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper>
        <div className="App">
          <Navbar darkMode={darkMode} set_darkMode={set_darkMode} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/motivation" component={Motivation} />
            <Route path="/triviaquiz" component={TriviaQuiz} />
          </Switch>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
