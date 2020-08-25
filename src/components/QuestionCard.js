import React from "react";
import {
  Button,
  Typography,
  Grid,
  ButtonGroup,
  Paper,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    align: "center",
    width: "100%",
  },
  card: {
    alignItems: "center",

    square: "false",
  },
  title: {
    padding: 10,
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#6BCAE2",
    textAlign: "center",
    alignItems: "center",
  },
  content: {
    fontSize: 25,
    padding: 10,
    fontWeight: "bold",
    color: "#ffff00",
  },

  button: {
    borderRadius: "50%",
    fontSize: 12,
    minWidth: 250,
    margin: 5,
    padding: 2,
    fontWeight: "bold",
  },
  buttonStart: {
    borderRadius: "30%",
    fontSize: 50,
    minWidth: 100,
    margin: 10,
    padding: 10,
    fontWeight: "bold",

    "&:hover": {
      color: "#f3ca20",
      backgroundImage:
        "url(https://image.freepik.com/free-photo/microprocessor-chipset-central-processor-unit-illumination-circuit_34645-889.jpg)",
    },
  },
});

export const defaultProps = {
  bgcolor: "background.paper",
  borderColor: "text.secondary",
  m: 1,
  border: 1,
  style: { width: "5rem", height: "5rem" },
};

const renderHTML = (rawHTML) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="body2" color="textPrimary" component="div">
            <div>
              Question: {questionNr} / {totalQuestions}
            </div>
          </Typography>
          <Typography
            className={classes.title}
            variant="body2"
            color="textSecondary"
            component="div"
          >
            <div className={classes.content}>{renderHTML(question)}</div>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup orientation="vertical">
          {answers.map((answer) => (
            <Button
              key={answer}
              color="primary"
              variant="contained"
              className={classes.button}
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <p dangerouslySetInnerHTML={{ __html: answer }} />
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default QuestionCard;
