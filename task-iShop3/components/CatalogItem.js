/* Подключение React */
import React from "react";
import PropTypes from "prop-types";

/* Подключение стилей */
import style from "./CatalogItem.css";

/* Подключение компонентов */


export class CatalogItem extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    code: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isSelectAllowed: PropTypes.bool.isRequired,
    isButtonsDisabled: PropTypes.bool.isRequired,
    selectProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    setEditableProduct: PropTypes.func.isRequired,
  }

  getProductCodeForSelect = (e) => {
    e.preventDefault();
    this.props.selectProduct(this.props.code);
  };

  getProductCodeForDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.deleteProduct(this.props.code, this.props.name);
  };

  getProductCodeForEdite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.editProduct(this.props.code);
    this.props.setEditableProduct(this.props.code);
  };

  render() {
    return (
      <tr className={this.props.isSelected ? "selected-product" : ""} onClick={this.props.isSelectAllowed ? this.getProductCodeForSelect : null}>
        <td> {this.props.name} </td>
        <td>
          <img src={this.props.image} />
        </td>
        <td> {this.props.price} </td>
        <td> {this.props.amount} </td>
        <td>
          <div className="catalog__item-controlls">
            <button type="button" disabled={this.props.isButtonsDisabled} onClick={this.getProductCodeForEdite}>Edit</button>
            <button type="button" disabled={this.props.isButtonsDisabled} onClick={this.getProductCodeForDelete}>Delete</button>
          </div>
        </td>
      </tr>
    );
  };

};