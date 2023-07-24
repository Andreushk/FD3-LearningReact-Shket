/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import Events */
import {clientsTableEvents, filterOption, editClient, saveEditedClientData, addClient, cancelAddingClient, saveAddingClient, deleteClient} from "../../events/events.js";

/* import component styles */
import "./ClientsTableBlock.css";

/* import necessary components */
import {FilterControlls} from "./FilterControlls/FilterControlls.jsx";
import {ClientsTable} from "./ClientsTable/ClientsTable.jsx";
import {ClientAddingForm} from "./ClientAddingForm/ClientAddingForm.jsx";


export class ClientsTableBlock extends React.PureComponent {

  static propTypes = {
    clientsData: PropTypes.arrayOf(
      PropTypes.shape({
        ID: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        patronymic: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
      }),
    ),
  };

  state = {

    filters: {
      all: true,
      active: false,
      inactive: false,
    },

    editingClientID: null,

    addingClient: false,
    newClientID: null,

    dataAboutClients: this.props.clientsData,
  };

  componentDidMount() {
    clientsTableEvents.addListener(filterOption, this.setFilterParametrs);
    clientsTableEvents.addListener(editClient, this.setEditingClient);
    clientsTableEvents.addListener(saveEditedClientData, this.setNewDataAboutClient);
    clientsTableEvents.addListener(addClient, this.showBlockForAddingClient);
    clientsTableEvents.addListener(cancelAddingClient, this.cancelAddingClient);
    clientsTableEvents.addListener(saveAddingClient, this.saveNewClient);
    clientsTableEvents.addListener(deleteClient, this.deleteClientData);
  };

  componentWillUnmount() {
    clientsTableEvents.removeListener(filterOption, this.setFilterParametrs);
    clientsTableEvents.removeListener(editClient, this.setEditingClient);
    clientsTableEvents.removeListener(saveEditedClientData, this.setNewDataAboutClient);
    clientsTableEvents.removeListener(addClient, this.showBlockForAddingClient);
    clientsTableEvents.removeListener(cancelAddingClient, this.cancelAddingClient);
    clientsTableEvents.removeListener(saveAddingClient, this.saveNewClient);
    clientsTableEvents.removeListener(deleteClient, this.deleteClientData);
  }

  setFilterParametrs = (option) => {
    if (this.state.filters[option] === true) return;

    const newFilterParametrs = {...this.state.filters};
    for (let key in newFilterParametrs) {
      if (key === option) {
        newFilterParametrs[key] = true;
      } else {
        newFilterParametrs[key] = false;
      };
    };
    this.setState({filters: newFilterParametrs});
  };

  setEditingClient = (ID) => {
    this.setState({editingClientID: ID});
  };

  setNewDataAboutClient = (data) => {
    const newArrayWithClientsData = [...this.state.dataAboutClients];
    for (let i = 0; i < newArrayWithClientsData.length; i++) {
      if (newArrayWithClientsData[i].ID === data.ID) {
        const newObjectWithClientData = {...newArrayWithClientsData[i],
          name: data.name,
          surname: data.surname,
          patronymic: data.patronymic,
          balance: data.balance,
        };
        newArrayWithClientsData[i] = newObjectWithClientData;
      };
    };

    this.setState({dataAboutClients: newArrayWithClientsData, editingClientID: null});
  };

  showBlockForAddingClient = () => {
    const arrayOfClientsID = this.state.dataAboutClients.map(client => client.ID);
    this.setState({addingClient: true, newClientID: arrayOfClientsID.length + 1});
  };

  cancelAddingClient = () => {
    this.setState({addingClient: false, newClientID: null});
  };

  saveNewClient = (dataObject) => {
    const newArrayWithClientsData = [...this.state.dataAboutClients];
    newArrayWithClientsData.push(dataObject)

    this.setState({addingClient: false, newClientID: null, dataAboutClients: newArrayWithClientsData});
  };

  deleteClientData = (ID) => {
    const newArrayWithClientsData = [...this.state.dataAboutClients];
    for (let i = 0; i < newArrayWithClientsData.length; i++) {
      if (newArrayWithClientsData[i].ID === ID) newArrayWithClientsData.splice(i, 1);
    };
    this.setState({dataAboutClients: newArrayWithClientsData});
  };

  render() {
    console.log("В ClientsTableBlock сработал render");

    return (
      <div className="clients">
        <div className="clients__container">
          <FilterControlls parametrs={this.state.filters} />
          <ClientsTable dataAboutClients={this.state.dataAboutClients} filterParameters={this.state.filters} editingClientID={this.state.editingClientID} />
          { this.state.addingClient && <ClientAddingForm ID={this.state.newClientID}/> }
        </div>
      </div>
    );
  };

};