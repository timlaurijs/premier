import React from "react";

// Mui components
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link, Button, Slide, Fade, Snackbar } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      paddingTop: "56.25%", // 16:9
      minHeight: 400,
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

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function PremierFounder(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Link href={props.gitUrl} target="_blank" isExternal>
            <Button variant="contained" color="primary" aria-label="settings">
              <GitHubIcon fontSize="small" />
            </Button>
          </Link>
        }
        title={props.name}
        subheader={props.description}
      />

      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title={props.name}
      />

      <CardContent>
        <Typography component="p">{props.description}</Typography>
      </CardContent>

      <CardContent>
        <Typography paragraph>
          <Button onClick={handleClick(SlideTransition)}>About me:</Button>
          <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            message={props.description}
            key={state.Transition.name}
          />
        </Typography>

        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Card>
  );
}
