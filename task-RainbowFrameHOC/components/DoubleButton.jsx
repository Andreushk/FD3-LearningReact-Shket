import React from "react";
import PropTypes from "prop-types";

import style from "./DoubleButton.css";


export class DoubleButton extends React.Component {

  static propTypes = {
    captionOne: PropTypes.string.isRequired,
    captionTwo: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    pressed: PropTypes.func.isRequired,
  };

  firstButtonClicked = (e) => {
    e.preventDefault();
    this.props.pressed("Pressed button: 1");
  };

  secondButtonClicked = (e) => {
    e.preventDefault();
    this.props.pressed("Pressed button: 2");
  };

  render() {
    return (
      <div className="text">
        <button type="button" onClick={this.firstButtonClicked}> {this.props.captionOne} </button>
        <p> {this.props.text} </p>
        <button type="button" onClick={this.secondButtonClicked}> {this.props.captionTwo} </button>
      </div>
    );
  };

};