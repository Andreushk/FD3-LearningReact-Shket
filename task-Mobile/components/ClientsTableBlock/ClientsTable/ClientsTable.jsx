/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import Events */
import {clientsTableEvents, addClient} from "../../../events/events.js";

/* import component styles */
import "./ClientsTable.css";

/* import necessary components */
import {Client} from "./Client/Client.jsx";


export class ClientsTable extends React.PureComponent {

  static propTypes = {
    dataAboutClients: PropTypes.arrayOf(
      PropTypes.shape({
        ID: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        patronymic: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
      }),
    ),
    filterParameters: PropTypes.shape({
      all: PropTypes.bool.isRequired,
      active: PropTypes.bool.isRequired,
      inactive: PropTypes.bool.isRequired,
    }),
    editingClientID: PropTypes.number,
  };

  showBlockForAddingClient = (e) => {
    e.preventDefault();
    clientsTableEvents.emit(addClient);
  };

  render() {
    console.log("В ClientsTable сработал render");

    const filteredArrayWithData = this.props.dataAboutClients.filter((client) => {
      const filterMode = (this.props.filterParameters.all && "all") || (this.props.filterParameters.active && "active") || (this.props.filterParameters.inactive && "inactive");
      if (filterMode === "all") return true;
      if (filterMode === "active") return client.balance.slice(1) > 0 ? true : false;
      if (filterMode === "inactive") return client.balance.slice(1) < 1 ? true : false;
    });

    const clientsJSX = [];
    filteredArrayWithData.forEach(client => {
      const clientJSX = <Client key={client.ID} data={client} isEditing={client.ID === this.props.editingClientID} />
      clientsJSX.push(clientJSX);
    });

    return (
      <div className="clients__table">
        <table>
          <thead>
            <tr>
              <th>Surname</th>
              <th>Name</th>
              <th>Patronymic</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{clientsJSX}</tbody>
        </table>
        <div className="clients__add-button">
          <button onClick={this.showBlockForAddingClient} type="button">Add Client</button>
        </div>
      </div>
    );
  };

};