/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import Events */
import {clientsTableEvents, cancelAddingClient, saveAddingClient} from "../../../events/events.js";

/* import component styles */
import "./ClientAddingForm.css";


export class ClientAddingForm extends React.PureComponent {

  static propTypes = {
    ID: PropTypes.number.isRequired,
  };

  state = {
    errorsInInputs: {
      name: null,
      surname: null,
      patronymic: null,
      balance: null,
    },
  };

  nameInputRef = React.createRef();
  surnameInputRef = React.createRef();
  patronymicInputRef = React.createRef();
  balanceInputRef = React.createRef();

  cancelAddingClient = (e) => {
    e.preventDefault();
    clientsTableEvents.emit(cancelAddingClient);
  };

  checkClientInfo = (e) => {
    e.preventDefault();
    
    const nameValue = this.nameInputRef.current.value.trim();
    const surnameValue = this.surnameInputRef.current.value.trim();
    const patronymicValue = this.patronymicInputRef.current.value.trim();
    const balanceValue = this.balanceInputRef.current.value.trim();

    const isErrorinName = nameValue.length > 0 ? false : true;
    const isErrorinSurname = surnameValue.length > 0 ? false : true;
    const isErrorinPatronymic = patronymicValue.length > 0 ? false : true;
    const isErrorinBalance = (balanceValue.slice(0, 1) === "$") && Number(balanceValue.slice(1).trim()) ? false : true;

    if (!isErrorinName && !isErrorinSurname && !isErrorinPatronymic && !isErrorinBalance) {
      clientsTableEvents.emit(saveAddingClient, {ID: this.props.ID, name: nameValue, surname: surnameValue, patronymic: patronymicValue, balance: balanceValue});
      return;
    };

    this.setState({
      errorsInInputs: {
        name: isErrorinName,
        surname: isErrorinSurname,
        patronymic: isErrorinPatronymic,
        balance: isErrorinBalance,
      },
    });

  };

  render() {
    console.log("В ClientAddingForm сработал render");

    return (
      <div className="clients__adding-form">
        <div className="clients__adding-form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={this.props.ID} readOnly />
          <div className="clients__adding-form-error"></div>
        </div>
        <div className="clients__adding-form-group">
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="surname" name="surname" ref={this.surnameInputRef}/>
          {this.state.errorsInInputs.surname && <div className="clients__adding-form-error">The surname must be longer than one character. Example: Ivanov</div>}
        </div>
        <div className="clients__adding-form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" ref={this.nameInputRef}/>
          {this.state.errorsInInputs.name && <div className="clients__adding-form-error">The name must be longer than one character. Example: Ivan</div>}
        </div>
        <div className="clients__adding-form-group">
          <label htmlFor="patronymic">Patronymic:</label>
          <input type="text" id="patronymic" name="patronymic" ref={this.patronymicInputRef}/>
          {this.state.errorsInInputs.patronymic && <div className="clients__adding-form-error">The name must be longer than one character. Example: Ivanovich</div>}
        </div>
        <div className="clients__adding-form-group">
          <label htmlFor="balance">Balance:</label>
          <input type="text" id="balance" name="balance" ref={this.balanceInputRef}/>
          {this.state.errorsInInputs.balance && <div className="clients__adding-form-error">The balance must be entered like this: $1</div>}
        </div>
        <div className="clients__adding-form-buttons">
          <button type="button" onClick={this.cancelAddingClient}>Cancel</button>
          <button type="submit" onClick={this.checkClientInfo}>Save</button>
        </div>
      </div>
    );
  };

};