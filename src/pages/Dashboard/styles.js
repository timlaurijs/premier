import { makeStyles, createStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 430,
      maxHigh: 630,
    },
    media: {
      paddingTop: "56.25%", // 16:9
      minHeight: 400,
      minWidth: 380,
      alignItems: "center",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);
