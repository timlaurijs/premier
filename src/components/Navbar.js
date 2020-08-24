import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Box } from "@material-ui/core";
import WbSunnySharpIcon from "@material-ui/icons/WbSunnySharp";

import BeachAccessIcon from "@material-ui/icons/BeachAccess";

export default function Navbar(props) {
  function darkModeButton() {
    if (props.darkMode) {
      return (
        <IconButton
          onClick={(e) => props.set_darkMode(false)}
          // className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <WbSunnySharpIcon fontSize="small" />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          onClick={(e) => props.set_darkMode(true)}
          // className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <BeachAccessIcon fontSize="small" />
        </IconButton>
      );
    }
  }

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Sign up</NavLink>
      <NavLink to="/motivation">Motivation</NavLink>
      <NavLink to="/triviaquiz">Trivia Quiz</NavLink>
      <Box ml={2}>{darkModeButton()}</Box>
    </div>
  );
}
