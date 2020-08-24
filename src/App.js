import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Pages
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

// Components
import Navbar from "./components/Navbar";
import Motivation from "./pages/Motivation";
import TriviaQuiz from "./pages/TriviaQuiz";

// Mui components
import { getUserWithStoredToken } from "./store/user/actions";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper, CssBaseline, Container } from "@material-ui/core";

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#663366", // here you can change the NavBar and Button color ("primary")
      dark: "#4d7966 ", // change the hover effect background color
    },
    type: "light",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#800000", // here you can change the NavBar and Button color ("primary")
      dark: "#000035", // change the hover effect background color
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
        <CssBaseline />
        <Navbar darkMode={darkMode} set_darkMode={set_darkMode} />
        <Container disableGutters={true} maxWidth="xs"></Container>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/motivation" component={Motivation} />
          <Route path="/triviaquiz" component={TriviaQuiz} />
        </Switch>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
