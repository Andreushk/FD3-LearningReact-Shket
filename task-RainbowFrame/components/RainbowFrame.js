import React from "react";
import PropTypes from "prop-types";


export class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.string.isRequired,
  };

  render() {
    let JSXForRender = this.props.children;

    for (let i = 0; i < this.props.colors.length; i++) {
      const color = this.props.colors[i];

      const newJSXPart = <div style={{border: `10px solid ${color}`, padding: "5px"}}> {JSXForRender} </div>
      JSXForRender = newJSXPart;
    };

    return JSXForRender;
  };
  
};