import React from "react";
import PropTypes from "prop-types";

import { RainbowFrameItem } from "./RainbowFrameItem.js";

export class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.string.isRequired,
  };

  render() {
    let JSXForRender = this.props.children;

    for (let i = 0; i < this.props.colors.length; i++) {
      const color = this.props.colors[i];

      const JSXPart = <RainbowFrameItem color={color}> {JSXForRender} </RainbowFrameItem>
      JSXForRender = JSXPart;
    };

    return JSXForRender;
  };
  
};