/* Подключение React */
import React from "react";
import PropTypes from "prop-types";

/* Подключение стилей */
import style from "./ProductInformation.css";

export class ProductInformation extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  };

  render() {
    return (
      <section className="catalog__product-information product-information">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Phone:</td>
              <td> {this.props.name} </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td> {this.props.price} </td>
            </tr>
            <tr>
              <td>Amount:</td>
              <td> {this.props.amount} </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  };

};