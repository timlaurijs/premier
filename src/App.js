import React, { useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Homepage from "./pages/Homepage"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Navbar from "./components/Navbar";
import Motivation from "./pages/Motivation";
import TriviaQuiz from "./pages/TriviaQuiz";
import { getUserWithStoredToken } from "./store/user/actions"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserWithStoredToken())
  }, [dispatch])

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/motivation" component={Motivation} />
        <Route path="/triviaquiz" component={TriviaQuiz} />
      </Switch>
    </div>
  )
}

export default App
