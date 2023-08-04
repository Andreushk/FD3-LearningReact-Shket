/* import React */
import React, { useState } from "react";
import PropTypes from "prop-types";

/* import components */
import { Controlls } from "./Controlls/Controlls.jsx";
import { List } from "./List/List.jsx";

/* import style */
import "./Filter.css";


export const Filter = (props) => {

  const [textValueForFilter, setTextValueForFilter] = useState("");
  const [sortStatus, setSortStatus] = useState(false);

  const changeTextValueForFilter = (newText) => {
    setTextValueForFilter(newText);
  };

  const changeSortStatus = (newStatus) => {
    setSortStatus(newStatus);
  };

  const resetFilterParametrs = () => {
    setTextValueForFilter("");
    setSortStatus(false);
  };

  const filterWordsArray = () => {
    let result = [...props.words];

    if (textValueForFilter) {
      const newArray = [];
      result.forEach(word => word.includes(textValueForFilter) ? newArray.push(word) : null);
      result = newArray;
    };

    if (sortStatus) result.sort();

    return result;
  };

  const filteredWordsArray = filterWordsArray();

  return (
    <div className="filter">
      <Controlls changeTextInInput={changeTextValueForFilter} textForInput={textValueForFilter} isSortStatusActive={sortStatus} changeSortStatus={changeSortStatus} resetParametrs={resetFilterParametrs} />
      <List wordsArray={filteredWordsArray} />
    </div>
  );

};

Filter.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
};