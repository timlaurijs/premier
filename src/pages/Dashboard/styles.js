import { makeStyles, createStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(7),
    },
    pageTitle: {
      marginLeft: 30,
      marginTop: 30,
    },
    h1: {
      margin: 0,
      fontSize: 30,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
    },
  })
);
