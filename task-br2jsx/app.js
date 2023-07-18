import React from "react";
import ReactDOM from "react-dom";

import {BR2JSX} from "./components/BR2JSX.js";

const text = "первый<br>второй<br/>третий<br />последний";

ReactDOM.render(
  <BR2JSX text={text}/>,
  document.querySelector(".wrapper")
);