import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Header from "./Header";

function Navigation() {
  return (
    <nav>
      <ul id="horizontalList">
        <li>
          <Header />
        </li>
        <li>
          <Link id="linkNav" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link id="linkNav" to="/create-exercise">
            Create Exercise
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
