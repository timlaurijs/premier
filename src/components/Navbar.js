import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// store items
import { selectUser } from "../store/user/selectors";
import { logOut } from "../store/user/actions";

// Material-ui components and icons
import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Tooltip,
  Fade,
} from "@material-ui/core";
import WbSunnySharpIcon from "@material-ui/icons/WbSunnySharp";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";

// useStyles used to over ride the button default props
const useStyles = makeStyles((theme) => ({
  button: {
    margin: 4,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#01095E",
    // backgroundImage:
    //   "url(https://cdn.wccftech.com/wp-content/uploads/2016/09/spacee-740x463.jpg)",

    "&:hover": {
      // color: "#000000",
      backgroundColor: "#010EAD", // does not work with a backgound image set as a background
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles(); // material ui classes
  const { imageUrl, token } = useSelector(selectUser);
  const dispatch = useDispatch();

  function darkModeButton() {
    if (props.darkMode) {
      return (
        <IconButton
          onClick={(e) => props.set_darkMode(false)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <WbSunnySharpIcon fontSize="large" />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          onClick={(e) => props.set_darkMode(true)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Brightness3RoundedIcon fontSize="large" />
        </IconButton>
      );
    }
  }

  const loginLogoutControls = token ? (
    <>
      <Tooltip
        size="medium"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="DASHBOARD"
      >
        <Button
          variant="contained"
          className={classes.button}
          component={NavLink}
          to="/dashboard"
        >
          Dashboard
        </Button>
      </Tooltip>
      <Tooltip
        size="medium"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="LOGOUT"
      >
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => dispatch(logOut())}
        >
          Log out
        </Button>
      </Tooltip>
      {imageUrl ? (
        <img
          src={imageUrl}
          style={{ height: "75px", padding: "5px" }}
          alt="userImage"
        ></img>
      ) : null}
    </>
  ) : (
    <>
      <Tooltip
        size="medium"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="LOGIN"
      >
        <Button
          size="small"
          variant="contained"
          className={classes.button}
          component={NavLink}
          to="/login"
        >
          Login
        </Button>
      </Tooltip>
      <Tooltip
        size="medium"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="SIGNUP"
      >
        <Button
          size="small"
          variant="contained"
          className={classes.button}
          component={NavLink}
          to="/signup"
        >
          Signup
        </Button>
      </Tooltip>
    </>
  );

  return (
    <AppBar>
      <Toolbar>
        <Box>{darkModeButton()}</Box>
        {/* Tooltip can display the button name */}
        <Tooltip
          size="medium"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="HOME"
        >
          <Button
            size="small"
            className={classes.button}
            variant="contained"
            component={NavLink}
            to="/"
          >
            Home
          </Button>
        </Tooltip>
        <Tooltip
          size="medium"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="QUIZ"
        >
          <Button
            size="small"
            variant="contained"
            className={classes.button}
            component={NavLink}
            to="/triviaquiz"
          >
            quiz
          </Button>
        </Tooltip>
        <Tooltip
          size="medium"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="CODING-GAME"
        >
          <Button
            size="small"
            variant="contained"
            className={classes.button}
            component={NavLink}
            to="/codinggame"
          >
            Game
          </Button>
        </Tooltip>
        {loginLogoutControls}
      </Toolbar>
    </AppBar>
  );
}
