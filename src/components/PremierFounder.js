import React from "react";

// Mui components
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Link,
  Button,
  Slide,
  Fade,
  Snackbar,
  Tooltip,
  CardActions,
  withStyles,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 450,
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

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

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
        title={props.name}
        subheader="Codaisseur Academy Graduate"
        action={
          <Tooltip
            color="primary"
            arrow="true"
            size="medium"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={`Link to ${props.name}'s gethub `}
          >
            <Link href={props.gitUrl} target="_blank" isExternal>
              <Button variant="contained" color="primary" aria-label="settings">
                <GitHubIcon fontSize="small" />
              </Button>
            </Link>
          </Tooltip>
        }
      />

      <Typography paragraph>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message={props.description}
          key={state.Transition.name}
        />
      </Typography>

      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title={props.name}
      />
      <CardContent>
        <Typography paragraph>About me ...</Typography>
        <Typography paragraph>Skills, stacks etc.</Typography>
        <Typography paragraph>Brief personal info</Typography>
      </CardContent>
      <CardActions spacing={5}>
        <Button
          startIcon={<FaceIcon />}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleClick(SlideTransition)}
        >
          About me
        </Button>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Conact</Typography>
              <p> email: </p>
              <p> country of origin: </p>
              <p> Languages: </p>
              <p> country of residence: </p>
            </React.Fragment>
          }
        >
          <Button>Contact</Button>
        </HtmlTooltip>
      </CardActions>
    </Card>
  );
}
