import React from "react"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import logo from "../assets/logo.svg"
// store items
import { selectUser } from "../store/user/selectors"
import { logOut } from "../store/user/actions"

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

} from "@material-ui/core";
import WbSunnySharpIcon from "@material-ui/icons/WbSunnySharp";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import RowingIcon from "@material-ui/icons/Rowing";


// useStyles used to over ride the button default props
const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 12,
    margin: 2,
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
}))

export default function Navbar(props) {
  const classes = useStyles() // material ui classes
  const { imageUrl, token, name } = useSelector(selectUser)
  const dispatch = useDispatch()

  function darkModeButton() {
    if (props.darkMode) {
      return (
        <IconButton
          onClick={(e) => props.set_darkMode(false)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <WbSunnySharpIcon fontSize="small" />
        </IconButton>
      )
    } else {
      return (
        <IconButton
          onClick={(e) => props.set_darkMode(true)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <RowingIcon fontSize="small" />
        </IconButton>
      )
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
        <Box ml={6}>
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
        <Box ml={1}>
          <Button
            size="small"
            variant="contained"
            className={classes.button}
            onClick={() => dispatch(logOut())}
          >
            Log out
          </Button>
        </Box>
      </Tooltip>
      {imageUrl ? (
        <Avatar
          style={{ height: 80, width: 80, marginLeft: 50 }}
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
  )

  return (
    <AppBar>
      <Toolbar>
        <img src={logo} style={{ height: 100, left: 0 }}></img>
        <Box ml={3}>{darkModeButton()}</Box>
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
        {loginLogoutControls}
      </Toolbar>
    </AppBar>
  )
}
