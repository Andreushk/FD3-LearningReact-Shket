import React from "react";
import ReactDOM from "react-dom";

import style from "./style.css";
import {DoubleButton} from "./components/DoubleButton.jsx";
import {withRainbowFrame} from "./hoc/withRainbowFrame.js";

const colors = ["red","orange", "yellow","green", "#00BFFF", "blue", "purple"];
const captionOne = "я из лесу";
const captionTwo = "мороз";
const text = "вышел, был сильный";

const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
  <FramedDoubleButton captionOne={captionOne} captionTwo={captionTwo} text={text} pressed={number => console.log(number)}/>,
  document.querySelector(".wrapper")
);