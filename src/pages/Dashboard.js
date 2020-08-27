import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//store items
import { selectUser } from "../store/user/selectors"

//components
import ChangeUserData from "../components/ChangeUserData"

//material ui
import { Button, Box } from "@material-ui/core"

export default function Dashboard() {

   // const { token, name, progress } = useSelector(selectUser);
  const user = useSelector(selectUser)
  const [change, setChange] = useState(false)
  const progress = user.progress
  const [level, setLevel] = useState("amoebe");

  useEffect(() => {
    if (progress > 5 && progress <= 10) {
      setLevel("mosquito");
    } else if (progress > 10 && progress <= 15) {
      setLevel("hamster");
    } else if (progress > 15 && progress <= 20) {
      setLevel("chihuahua");
    } else if (progress > 20 && progress <= 30) {
      setLevel("boar");
    } else if (progress > 30 && progress <= 50) {
      setLevel("tiger");
    } else if (progress > 50 && progress <= 75) {
      setLevel("elephant");
    } else if (progress > 75) {
      setLevel("mammoth");
    }
  });

  if (user.token) {
    return (
      <Box mt={10} style={{ fontSize: 25, marginLeft: 20 }}>
        <h1>Welcome, {user.name}!</h1>
        {!change ? (
          <>
            <Box style={{ width: "50%", backgroundColor: "grey" }}>
                <Box
                  style={{ width: `${progress}%`, backgroundColor: "lightgray" }}
                  p={1}
                  my={0.5}
                ></Box>
            </Box>
            <p>What do you want to do today?</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setChange(true)}
            >
              Change my information
            </Button>
          </>
        ) : (
          <>
            <p>change your information</p>
            <ChangeUserData user={user} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setChange(false)}
            >
              Back to dashboard
            </Button>
          </>
        )}
        {!change ? (
          <>
            <Button variant="contained" color="primary">
              CS trivia quiz
            </Button>
            <Button variant="contained" color="primary">
              Test my coding skills
            </Button>
          </>
        ) : null}
      </Box>
    );
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
    );
  }
}
