/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import Events */
import {clientsTableEvents, filterOption} from "../../../events/events.js";

/* import component styles */
import "./FilterControlls.css";


export class FilterControlls extends React.PureComponent {

  static propTypes = {
    parametrs: PropTypes.shape({
      all: PropTypes.bool.isRequired,
      active: PropTypes.bool.isRequired,
      inactive: PropTypes.bool.isRequired,
    }),
  };

  setFilterOptionToAll = (e) => {
    e.preventDefault();
    clientsTableEvents.emit(filterOption, "all");
  };

  setFilterOptionToActive = (e) => {
    e.preventDefault();
    clientsTableEvents.emit(filterOption, "active");
  };

  setFilterOptionToInactive = (e) => {
    e.preventDefault();
    clientsTableEvents.emit(filterOption, "inactive");
  };

  render() {
    console.log("В FilterControlls сработал render");

    return (
      <div className="clients__filter-controlls">
        <button onClick={this.setFilterOptionToAll} className={this.props.parametrs.all ? "active" : null} type="button">All</button>
        <button onClick={this.setFilterOptionToActive} className={this.props.parametrs.active ? "active" : null} type="button">Active</button>
        <button onClick={this.setFilterOptionToInactive} className={this.props.parametrs.inactive ? "active" : null} type="button">Inactive</button>
      </div>
    );
  };

};