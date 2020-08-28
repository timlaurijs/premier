import React from "react";

//MUI components
import { makeStyles } from "@material-ui/core";
import {
  Button,
  Typography,
  Grid,
  ButtonGroup,
  Paper,
  Box,
} from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    align: "center",
    width: "100%",
  },
  title: {
    padding: 10,
    fontSize: 15,

    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
  content: {
    marginTop: 20,
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
  },

  button: {
    borderRadius: 150,
    fontSize: 15,
    minWidth: 250,
    margin: 10,
    padding: 15,
    fontWeight: "bold",
  },
});

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
      <Grid item xs={12} sm={12}>
        <Paper
          elevation={23}
          className={classes.title}
          style={{ minHeight: 600, borderRadius: 100, fontWeight: "bold" }}
        >
          <Typography component="div">
            <div className="container">
              Question: {questionNr} / {totalQuestions}
            </div>
          </Typography>
          <Box>
            <Typography className={classes.content} component="div">
              <div>{renderHTML(question)}</div>
            </Typography>
          </Box>
          <ButtonGroup mt={10} orientation="vertical">
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default QuestionCard;
