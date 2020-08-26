import React, { useContext } from "react"
import { useSelector } from "react-redux"
import { Button, Box } from "@material-ui/core"
import { Link } from "react-router-dom"
import { selectUser } from "../store/user/selectors"

export default function Dashboard() {
  const { token, name } = useSelector(selectUser)

  if (token) {
    return (
      <Box mt={10} style={{ fontSize: 25, marginLeft: 20 }}>
        <h1>Welcome, {name}!</h1>
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
      </Box>
    )
  } else {
    return (
      <div>
        <h3>You need to be logged in!</h3>
        <Link to={`/login`}>
          <button style={{ margin: "20px", borderRadius: "15px" }}>
            Go to Login
          </button>
        </Link>
      </div>
    )
  }
}
