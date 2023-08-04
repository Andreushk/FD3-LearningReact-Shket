/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import style */
import "./List.css";


export const List = (props) => {

  const arrayOfParagraphsWithWords = props.wordsArray.map(word => <p key={word}> {word} </p>);

  return (
    <div className="filter__items">
      <div className="filter__items-container">
        {arrayOfParagraphsWithWords}
      </div>
    </div>
  );

};

List.proptypes = {
  wordsArray: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
};