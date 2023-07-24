/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import Events */
import {clientsTableEvents, editClient, saveEditedClientData, deleteClient} from "../../../../events/events.js";

/* import component styles */
import "./Client.css";


export class Client extends React.PureComponent {

  static propTypes = {
    data: PropTypes.shape({
      ID: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      patronymic: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
    }),
    isEditing: PropTypes.bool.isRequired,
  };

  nameInputRef = React.createRef();
  surnameInputRef = React.createRef();
  patronymicInputRef = React.createRef();
  balanceInputRef = React.createRef();

  takeDataFromInputs = () => {
    const data = {
      ID: this.props.data.ID,
      name: this.nameInputRef.current.value,
      surname: this.surnameInputRef.current.value,
      patronymic: this.patronymicInputRef.current.value,
      balance: this.balanceInputRef.current.value,
    };
    clientsTableEvents.emit(saveEditedClientData, data);
  };

  makeClientEditable = (e) => {
    e.preventDefault();
    clientsTableEvents.emit(editClient, this.props.data.ID)
  };

  deleteClient = (e) => {
    e.preventDefault();
    clientsTableEvents.emit(deleteClient, this.props.data.ID)
  };

  render() {
    console.log(`Client - ${this.props.data.name} ${this.props.data.patronymic} render`);

    const isEditing = this.props.isEditing
    
    return (
      <tr>
        {
          (!isEditing && <td>{this.props.data.surname}</td>)
          ||
          (isEditing && <td><input type="text" defaultValue={this.props.data.surname} ref={this.surnameInputRef}/></td>)
        }
        {
          (!isEditing && <td>{this.props.data.name}</td>)
          ||
          (isEditing && <td><input type="text" defaultValue={this.props.data.name} ref={this.nameInputRef}/></td>)
        }
        {
          (!isEditing && <td>{this.props.data.patronymic}</td>)
          ||
          (isEditing && <td><input type="text" defaultValue={this.props.data.patronymic} ref={this.patronymicInputRef}/></td>)
        }
        {
          (!isEditing && <td>{this.props.data.balance}</td>)
          ||
          (isEditing && <td><input type="text" defaultValue={this.props.data.balance} ref={this.balanceInputRef}/></td>)
        }
        <td className={this.props.data.balance.slice(1) < 1 ? "clients__status-cell status-inactive " : "clients__status-cell status-active"}> {this.props.data.balance.slice(1) < 1 ? "Inactive" : "Active"} </td>
        <td>
          { 
          (!isEditing && <button onClick={this.makeClientEditable} className="clients__edit" type="button">Edit</button>)
          ||
          (isEditing && <button onClick={this.takeDataFromInputs} className="clients__save" type="button">Save</button>)
          } 
        </td>
        <td>
          <button onClick={this.deleteClient} className="clients__delete" type="button">Delete</button>
        </td>
      </tr>
    );
  };

};
