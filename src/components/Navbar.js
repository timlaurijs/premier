import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.svg";
// store items
import { selectUser } from "../store/user/selectors";
import { logOut } from "../store/user/actions";
import Brightness4Icon from "@material-ui/icons/Brightness4";

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
  Avatar,
  Paper,
} from "@material-ui/core";
import WbSunnySharpIcon from "@material-ui/icons/WbSunnySharp";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import RowingIcon from "@material-ui/icons/Rowing";
import Brightness7Icon from "@material-ui/icons/Brightness7";

// useStyles used to over ride the button default props
const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 10,
    margin: 2,
    color: "#ffffff",
    fontWeight: "bold",
    backgroundColor: "#01095E",

    "&:hover": {
      color: "#000000",
      backgroundColor: "#000000", // does not work with a backgound image set as a background
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles(); // material ui classes
  const { imageUrl, token, name } = useSelector(selectUser);
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
          <Brightness7Icon fontSize="large" />
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
          <Brightness4Icon fontSize="large" />
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
        <Box ml={140}>
          <Button
            size="small"
            variant="contained"
            className={classes.button}
            component={NavLink}
            to="/dashboard"
          >
            Dashboard
          </Button>
        </Box>
      </Tooltip>
      <Tooltip
        size="medium"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="LOGOUT"
      >
        <Button
          size="small"
          variant="contained"
          className={classes.button}
          onClick={() => dispatch(logOut())}
        >
          Log out
        </Button>
      </Tooltip>

      {imageUrl ? (
        <Avatar
          style={{ padding: 1, height: 60, width: 60 }}
          src={imageUrl}
        ></Avatar>
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
        <Box ml={6}>
          <Button
            size="small"
            variant="contained"
            className={classes.button}
            component={NavLink}
            to="/login"
          >
            Login
          </Button>
        </Box>
      </Tooltip>
      <Tooltip
        size="medium"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="SIGNUP"
      >
        <Box ml={1}>
          <Button
            size="small"
            variant="contained"
            className={classes.button}
            component={NavLink}
            to="/signup"
          >
            Signup
          </Button>
        </Box>
      </Tooltip>
    </>
  );

  return (
    <AppBar elevation={23}>
      <Toolbar>
        <img src={logo} style={{ height: 60 }} alt="logo"></img>
        {/* Tooltip can display the button name */}
        <Tooltip
          size="medium"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="HOME"
        >
          <Box ml={5}>
            <Button
              size="small"
              className={classes.button}
              variant="contained"
              component={NavLink}
              to="/"
            >
              Home
            </Button>
          </Box>
        </Tooltip>
        <Tooltip
          size="medium"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="QUIZ"
        >
          <Box ml={1}>
            <Button
              size="small"
              variant="contained"
              className={classes.button}
              component={NavLink}
              to="/triviaquiz"
            >
              quiz
            </Button>
          </Box>
        </Tooltip>
        <Tooltip
          size="medium"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="CODING-GAME"
        >
          <Box ml={1}>
            <Button
              size="small"
              variant="contained"
              className={classes.button}
              component={NavLink}
              to="/codinggame"
            >
              Game
            </Button>
          </Box>
        </Tooltip>
        <Box ml={3}>{darkModeButton()}</Box>
        {loginLogoutControls}
      </Toolbar>
    </AppBar>
  );
}
