import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(7),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
    },
  })
);
