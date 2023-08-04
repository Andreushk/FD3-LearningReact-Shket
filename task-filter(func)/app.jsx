/* import React */
import React from "react";
import ReactDOM from "react-dom";

/* import components */
import { Filter } from "./components/Filter.jsx";

/* import style */
import "./style.css";

/* array with words */
const arrayWithWords = ["california", "everything", "aboveboard", "washington", "basketball", "weathering", "characters", "literature", "contraband", "appreciate"];


ReactDOM.render(
  <Filter words={arrayWithWords} />,
  document.querySelector(".wrapper")
);