import React from "react";
import PropTypes from "prop-types";

export const RainbowFrameItem = props => {
  return <div style={{border: `10px solid ${props.color}`, padding: "5px"}}> {props.children} </div>
};

RainbowFrameItem.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};