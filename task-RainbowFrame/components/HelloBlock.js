import React from "react";
import PropTypes from "prop-types";

import {RainbowFrame} from "./RainbowFrame.js";


export class HelloBlock extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    message: PropTypes.string.isRequired,
  };

  render() {
    return (
      <RainbowFrame colors={this.props.colors}>
        {this.props.message}
      </RainbowFrame>
    );
  };

};