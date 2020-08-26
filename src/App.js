import React, { useEffect, useState } from "react"
import { Switch, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

//Pages
import Homepage from "./pages/Homepage"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import CodingGame from "./pages/CodingGame"

// Components
import Navbar from "./components/Navbar"
import Motivation from "./pages/Motivation"
import TriviaQuiz from "./pages/TriviaQuiz"

// Mui components
import { getUserWithStoredToken } from "./store/user/actions"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { Paper, CssBaseline, Container } from "@material-ui/core"

const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: "#e6e7f7",
    },
    primary: {
      main: "#4D5BF7", // here you can change the NavBar and Button color ("primary")
      dark: "#0215DE ", // change the hover effect background color
    },
    type: "light",
    // background: { paper: "#7A9D96" },
  },
})

const darkTheme = createMuiTheme({
  palette: {
    background: {
      default: "#3D4061",
    },
    primary: {
      main: "#F7594A", // here you can change the NavBar and Button color ("primary")
      dark: "#DE1200", // change the hover effect background color"
    },
    type: "dark",
  },
})

function App() {
  const [darkMode, set_darkMode] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserWithStoredToken())
  }, [dispatch])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container disableGutters={true} maxWidth="xl">
        <CssBaseline />
        <Navbar darkMode={darkMode} set_darkMode={set_darkMode} />
        <Switch>
          <Route exact path="/codinggame" component={CodingGame} />
          <Route exact path="/" component={Homepage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/motivation" component={Motivation} />
          <Route path="/triviaquiz" component={TriviaQuiz} />
        </Switch>
      </Container>
    </ThemeProvider>
  )
}

export default App
