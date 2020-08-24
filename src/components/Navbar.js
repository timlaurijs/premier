import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Sign up</NavLink>
      <NavLink to="/motivation">Motivation</NavLink>
      <NavLink to="/triviaquiz">Trivia Quiz</NavLink>
    </div>
  );
}
