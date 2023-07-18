import React from "react";
import ReactDOM from "react-dom";

import style from "./style.css";

import {HelloBlock} from "./components/HelloBlock.js";


const colors = ["red","orange", "yellow","green", "#00BFFF", "blue", "purple"];
const message = "Hello!";


ReactDOM.render(
  <HelloBlock colors={colors} message={message} />,
  document.querySelector(".wrapper")
);