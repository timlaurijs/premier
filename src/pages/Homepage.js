import React, { useState, useEffect } from "react";
import PremierFounder from "../components/PremierFounder";
import axios from "axios";
import { API_URL_QUOTES } from "../constants/constants";
import { Box, Grid } from "@material-ui/core";

const premierFounders = [
  {
    name: "Ivo",
    description: "Loves coffee!",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/66206483?s=400&u=c2a444fe4defb6454d8f0876bb6538ed653c2111&v=4",
    gitUrl: "https://github.com/mayallzObject",
  },

  {
    name: "Karem",
    description: "Cat lady!",
    imageUrl:
      "https://ca.slack-edge.com/T0DK39WAJ-U014DDWRCQP-4c57575d19a9-512",
    gitUrl: "https://github.com/Karem1986",
  },
  {
    name: "Tim",
    description: "Coffee addict!",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/65892566?s=400&u=e2fc9b1339cf9f3d535a62948b6e5281fcb9a287&v=4",
    gitUrl: "https://github.com/timlaurijs",
  },

  {
    name: "Nina",
    description: "Dog lover!",
    imageUrl:
      "https://ca.slack-edge.com/T0DK39WAJ-U0153LFMCQL-678c7dd328ad-512",
    gitUrl: "https://github.com/grakify90",
  },
];

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min));
}

export default function Homepage() {
  const [inspirationalQuote, setInspirationalQuote] = useState({
    text: "",
    author: "",
  });

  useEffect(() => {
    async function fetchQuote() {
      const data = await axios.get(API_URL_QUOTES);
      const randomNumber = getRandomNumber(1, 1643);
      const randomQuote = data.data[randomNumber];
      setInspirationalQuote({ ...inspirationalQuote, ...randomQuote });
    }
    fetchQuote();
  }, []);

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

      <Grid container spacing={2}>
        {premierFounders.map((founder) => {
          return (
            <Grid item xs={12} sm={3}>
              <PremierFounder
                key={Math.random()}
                name={founder.name}
                description={founder.description}
                imageUrl={founder.imageUrl}
                gitUrl={founder.gitUrl}
              />
            </Grid>
          );
        })}
      </Grid>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: 25, marginTop: "10px" }}>Our story</h2>
        <h4>Why did we start to code?</h4>
        <p>
          We all come from different backgrounds, none of us started to code as
          the usual nerdy 12 years old wanting to develop their own games.
          Instead, we did all sort of different things and just like you, we did
          not know what we wanted in our lives until one day, suddenly that
          changed for the better.
        </p>
        <p>
          It was not easy for any of us to learn how to code, and we are all
          still learning but what keeps us motivated is the goal to help other
          people to be motivated and try out coding for fun, because we believe
          that if you do something and you also enjoy it, then a wonder can
          happen, who knows? You might be the next Mark Zuckerberg! Think like
          Zuck!
          <p>
            For example, Karem started on this path by finding out about
            blogging with WordPress, she did not know she was going to end up
            doing a bootcamp a year later and decide to work as a developer.
            Nina decided to try it out after her trip to Japan when a friend
            suggested the idea, she gave it a go and found joy in it. So, you
            can get started today and try out here, if this is what you want to
            do for the rest of your life, we really hope you do!
          </p>
        </p>
        <p>
          {" "}
          And lastly but not least, if you ever get stuck or have any questions,
          we are here for you to help you and guide you, but we strongly advice
          you to try out a couple of times first the challenges and see if you
          can figure it out, because that will prepare you for the real world.
        </p>
        <p>
          {" "}
          Enjoy Premiers coding game and let us know on Twitter how it went, so
          we can celebrate your success together. Happy Premiers coding time
          from all of us XOXO
        </p>
      </div>

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
      ></div>
    </Box>
  );
}
