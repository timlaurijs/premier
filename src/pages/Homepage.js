import React, { useState, useEffect } from "react"
import PremierFounder from "../components/PremierFounder"
import axios from "axios"
import { API_URL_QUOTES } from "../constants/constants"
import { Button, Box } from "@material-ui/core"
import { Link } from "react-router-dom"

const premierFounders = [
  {
    name: "Ivo",
    description: "Loves coffee!",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/66206483?s=400&u=c2a444fe4defb6454d8f0876bb6538ed653c2111&v=4",
  },
  {
    name: "Karem",
    description: "Cat lady!",
    imageUrl:
      "https://ca.slack-edge.com/T0DK39WAJ-U014DDWRCQP-4c57575d19a9-512",
  },
  {
    name: "Tim",
    description: "coffee addict!",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/65892566?s=400&u=e2fc9b1339cf9f3d535a62948b6e5281fcb9a287&v=4",
  },
  {
    name: "Nina",
    description: "Dog lover!",
    imageUrl:
      "https://ca.slack-edge.com/T0DK39WAJ-U0153LFMCQL-678c7dd328ad-512",
  },
]

function getRandomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min))
}

export default function Homepage() {
  const [inspirationalQuote, setInspirationalQuote] = useState({
    text: "",
    author: "",
  })

  useEffect(() => {
    async function fetchQuote() {
      const data = await axios.get(API_URL_QUOTES)
      const randomNumber = getRandomNumber(1, 1643)
      const randomQuote = data.data[randomNumber]
      setInspirationalQuote({ ...inspirationalQuote, ...randomQuote })
    }
    fetchQuote()
  }, [])

  return (
    <Box mt={10} style={{ fontSize: 25, paddingLeft: 25 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: 30, marginTop: "10px" }}>
          Welcome to Premier Coding!
        </h1>
        <h2 style={{ fontSize: 25, marginTop: "10px" }}>Who are we?</h2>

      </div>

      <Box
        style={{
          boarderRadius: 100,
          width: "50vw",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          padding: "10px",
          border: "2px solid #4D5BF7",
        }}
      >
        {premierFounders.map((founder) => {
          return (
            <PremierFounder
              key={Math.random()}
              name={founder.name}
              description={founder.description}
              imageUrl={founder.imageUrl}
            />
          )
        })}
      </Box>
      <div style={{ margin: "30px", textAlign: "center" }}>
        <p style={{ fontSize: 20 }}>
          <i>{inspirationalQuote.text}</i>
        </p>

        {inspirationalQuote.author ? (
          <p style={{ fontSize: 20 }}>- {inspirationalQuote.author}</p>
        ) : null}
      </div>
      <div
        style={{
          width: "50vw",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/signup">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "30px", width: "100px", height: "50px" }}
          >
            Sign Up
          </Button>
        </Link>

        <Link to="/login">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "30px", width: "100px", height: "50px" }}
          >
            Login
          </Button>
        </Link>
      </div>
    </Box>
  )
}
