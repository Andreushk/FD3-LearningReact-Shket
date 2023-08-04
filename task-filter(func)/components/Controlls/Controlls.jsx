/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import style */
import "./Controlls.css";


export const Controlls = (props) => {

  const changeTextValueForFilter = (e) => {
    props.changeTextInInput(e.target.value);
  };

  const changeCheckboxValue = (e) => {
    props.changeSortStatus(e.target.checked);
  };

  const resetParametrs = (e) => {
    props.resetParametrs();
  };

  return (
    <div className="filter__controlls">
      <input type="checkbox" checked={props.isSortStatusActive} onChange={changeCheckboxValue} />
      <input type="text" value={props.textForInput} onChange={changeTextValueForFilter} />
      <button type="button" onClick={resetParametrs}>Reset</button>
    </div>
  );

};

Controlls.propTypes = {
  textForInput: PropTypes.string.isRequired,
  changeTextInInput: PropTypes.func.isRequired,

  isSortStatusActive: PropTypes.bool.isRequired,
  changeSortStatus: PropTypes.func.isRequired,

  resetParametrs: PropTypes.func.isRequired,
};