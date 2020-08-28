import React, { useState, useEffect } from "react";
import PremierFounder from "../../components/PremierFounder";
import axios from "axios";
import { API_URL_QUOTES } from "../../constants/constants";
import { Box, Grid, Paper, Snackbar, Button, Slide } from "@material-ui/core";
import { useStyles } from "./styles";

const premierFounders = [
  {
    name: "Ivo",
    description: "Loves coffee!",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/66206483?s=400&u=c2a444fe4defb6454d8f0876bb6538ed653c2111&v=4",
    gitUrl: "https://github.com/mayallzObject",
    email: "goranbre@abv.bg",
    linkedIn: "unknown",
  },

  {
    name: "Karem",
    description: "Cat lady!",
    imageUrl:
      "https://ca.slack-edge.com/T0DK39WAJ-U014DDWRCQP-4c57575d19a9-512",
    gitUrl: "https://github.com/Karem1986",
    email: "karem.ortiz@outlook.com",
    linkedIn: "https://www.linkedin.com/in/karemortiz/",
  },
  {
    name: "Tim",
    description: "coffee addict!",
    imageUrl:
      "https://avatars0.githubusercontent.com/u/65892566?s=400&u=e2fc9b1339cf9f3d535a62948b6e5281fcb9a287&v=4",
    gitUrl: "https://github.com/timlaurijs",
    email: "",
    linkedIn: "",
  },

  {
    name: "Nina",
    description: "Dog lover!",
    imageUrl:
      "https://ca.slack-edge.com/T0DK39WAJ-U0153LFMCQL-678c7dd328ad-512",
    gitUrl: "https://github.com/grakify90",
    email: "ninavanes1990@hotmail.com",
    linkedIn: "https://www.linkedin.com/in/ninavanes/",
  },
];

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min));
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function Homepage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [transition, setTransition] = React.useState(undefined);

  const [inspirationalQuote, setInspirationalQuote] = useState({
    text: "",
    author: "",
  });
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <Box mt={9} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} s>
          <Paper elevation={23} className={classes.paper}>
            <h1 style={{ fontFamily: "Courier New" }}>
              Welcome to Premier Coding!
            </h1>
            <h2>Who are we?</h2>
            <Button
              // className={classes.paper}
              color="primary"
              variant="contained"
              onClick={handleClick(TransitionDown)}
            >
              Get motivated
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Snackbar
            className={classes.paper}
            style={{ fontSize: 100 }}
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            message={
              <Box>
                <h1>{inspirationalQuote.text}</h1>
                <div>
                  {inspirationalQuote.author ? (
                    <p>- {inspirationalQuote.author}</p>
                  ) : null}
                </div>
              </Box>
            }
            key={transition ? transition.name : ""}
          />
        </Grid>

        {premierFounders.map((founder) => {
          return (
            <Grid item xs={12} sm={3}>
              <PremierFounder
                key={Math.random()}
                name={founder.name}
                description={founder.description}
                imageUrl={founder.imageUrl}
                gitUrl={founder.gitUrl}
                email={founder.email}
                linkedIn={founder.linkedIn}
              />
            </Grid>
          );
        })}

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
            We all come from different backgrounds, none of us started to code
            as the usual nerdy 12 years old wanting to develop their own games.
            Instead, we did all sort of different things and just like you, we
            did not know what we wanted in our lives until one day, suddenly
            that changed for the better. It was not easy for any of us to learn
            how to code, and we are all still learning but what keeps us
            motivated is the goal to help other people to be motivated and try
            out coding for fun, because we believe that if you do something and
            you also enjoy it, then wonders can happen, who knows? You might be
            the next Mark Zuckerberg!
          </p>
          <p>
            For example, Karem started on this path by finding out about
            blogging with WordPress, she did not know she was going to end up
            doing a bootcamp a year later and deciding to work as a developer.
            Nina decided to try it our after her trip to Japan when a friend
            suggested the idea, she gave it a go and found joy in it. So, you
            can get started today and try out here, if this is what you want to
            do for the rest of your live, we really hope you do!
          </p>
          <p>
            {" "}
            And last but not least, if you ever get stuck or have any questions,
            we are here for you to help you and guide you, but we strongly
            advice you to try out a couple of times first the challenges and see
            if you can figure it out, because that will prepare you for the real
            work world. Enjoy Premiers coding game and let us know on Twitter
            how it went, so we can celebrate your success together! Happy
            Premiers coding time from all of us.
          </p>
        </div>
      </Grid>
    </Box>
  );
}
