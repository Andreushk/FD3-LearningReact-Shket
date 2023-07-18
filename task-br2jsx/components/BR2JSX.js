import React from "react";
import PropTypes from "prop-types";

import style from "./BR2JSX.css";


export class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {

    const parts = this.props.text.trim().split(/<br\s*\/?>/);
    const partsForRender = [];

    parts.forEach((part, index) => {
      partsForRender.push(part);
      if (index !== parts.length - 1) partsForRender.push(<br key={index}/>);
    });
    
    return (
      <div className="br2jsx">
        {partsForRender}
      </div>
    );

  };

};