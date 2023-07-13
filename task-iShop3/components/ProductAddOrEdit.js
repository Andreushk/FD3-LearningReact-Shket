/* Подключение React */
import React from "react";
import PropTypes, { number } from "prop-types";

/* Подключение стилей */
import style from "./ProductAddOrEdit.css";

export class ProductAddOrEdit extends React.Component {

  static propTypes = {
    mode: PropTypes.string.isRequired,

    lastProductCode: PropTypes.number,
    cancelAdding: PropTypes.func,
    saveAdding: PropTypes.func,

    editingProductData: PropTypes.shape({
      phoneModel: PropTypes.string,
      phoneImage: PropTypes.string,
      phonePrice: PropTypes.string,
      stockQuantity: PropTypes.number,
      productCode: PropTypes.number,
    }),
    cancelEditing: PropTypes.func,
    saveEditing: PropTypes.func,

    disableInterface: PropTypes.func,
  };

  state = {
    code: (this.props.lastProductCode + 1) || (this.props.editingProductData.productCode),
    name: this.props.editingProductData ? this.props.editingProductData.phoneModel : "",
    imageURL: this.props.editingProductData ? this.props.editingProductData.phoneImage : "",
    price: this.props.editingProductData ? this.props.editingProductData.phonePrice : "",
    amount: this.props.editingProductData ? this.props.editingProductData.stockQuantity : "",
    
    errorsInInputs: {
      inName: null,
      inImageURL: null,
      inPrice: null,
      inAmount: null,
    },

    isSomethingChanged: false,
    isSaveButtonDisabled: true,
  };

  setProductNameValue = (e) => {
    e.preventDefault();

    const value = e.target.value.trim();
    const isErrorInName = value.length < 1 ? true : false;
    
    this.setState(prevState => ({
      name: value,
      errorsInInputs: {
        ...prevState.errorsInInputs,
        inName: isErrorInName,
      },
    }), 
    () => {
      this.setThatSomethingWasChanged();
      this.checkDataValidity();
    });
  };

  setProductImageURLValue = (e) => {
    e.preventDefault();

    const value = e.target.value.trim();
    const isErrorInImageURL = value.length < 1 ? true : false;

    this.setState(prevState => ({
      imageURL: value,
      errorsInInputs: {
        ...prevState.errorsInInputs,
        inImageURL: isErrorInImageURL,
      },
    }), 
    () => {
      this.setThatSomethingWasChanged();
      this.checkDataValidity();
    });
  };

  setProductPriceValue = (e) => {
    e.preventDefault();

    const value = e.target.value.trim();
    const isErrorInPrice = (value.slice(0, 1) !== "$") || (value.slice(1).trim() < 1) ? true : false;

    this.setState(prevState => ({
      price: value,
      errorsInInputs: {
        ...prevState.errorsInInputs,
        inPrice: isErrorInPrice,
      },
    }),
    () => {
      this.setThatSomethingWasChanged();
      this.checkDataValidity();
    });
  };

  setProductAmountValue = (e) => {
    e.preventDefault();

    const value = Number(e.target.value.trim());
    const isErrorInAmount = isNaN(value) || value < 1 ? true : false;

    this.setState(prevState => ({
      amount: value,
      errorsInInputs: {
        ...prevState.errorsInInputs,
        inAmount: isErrorInAmount,
      },
    }),
    () => {
      this.setThatSomethingWasChanged();
      this.checkDataValidity();
    });
  };

  setThatSomethingWasChanged = () => {
    if (this.props.mode === "editing" && this.state.isSomethingChanged === false) {
      this.setState({isSomethingChanged: true});
      this.props.disableInterface();
    };
  };

  checkDataValidity = () => {
    const isAllInputsHaveData = this.state.name && this.state.imageURL && this.state.price && this.state.amount && true;
    const isAllInputsValide = !this.state.errorsInInputs.inName && !this.state.errorsInInputs.inImageURL && !this.state.errorsInInputs.inPrice && !this.state.errorsInInputs.inAmount;

    if (isAllInputsHaveData && isAllInputsValide) {
      this.setState({isSaveButtonDisabled: false});
    };
  };

  applyСhanges = (e) => {
    e.preventDefault();

    const productInformation = {code: this.state.code, name: this.state.name, imageURL: this.state.imageURL, price: this.state.price, amount: this.state.amount}
    this.props.mode === "adding" ? this.props.saveAdding(productInformation) : this.props.saveEditing(productInformation);
  };

  render() {
    return (
      <section className={this.props.mode === "adding" ? "catalog__product-adding product-adding" : "catalog__product-editing product-editing"}>
        <div className={this.props.mode === "adding" ? "product-adding__form" : "product-editing__form"}>
          <div className={this.props.mode === "adding" ? "product-adding__form-group" : "product-editing__form-group"}>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" value={this.state.code} readOnly />
          </div>
          <div className={this.props.mode === "adding" ? "product-adding__form-group" : "product-editing__form-group"}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={this.setProductNameValue} value={this.state.name} />
            { this.state.errorsInInputs.inName && <div className={this.props.mode === "adding" ? "product-adding__form-error" : "product-editing__form-error"}> The name must be longer than 1 character </div> }
          </div>
          <div className={this.props.mode === "adding" ? "product-adding__form-group" : "product-editing__form-group"}>
            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" name="image" onChange={this.setProductImageURLValue} value={this.state.imageURL} />
            { this.state.errorsInInputs.inImageURL && <div className={this.props.mode === "adding" ? "product-adding__form-error" : "product-editing__form-error"}> The URL must be longer than 1 character </div> }
          </div>
          <div className={this.props.mode === "adding" ? "product-adding__form-group" : "product-editing__form-group"}>
            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" onChange={this.setProductPriceValue} value={this.state.price} />
            { this.state.errorsInInputs.inPrice && <div className={this.props.mode === "adding" ? "product-adding__form-error" : "product-editing__form-error"}> The price should be in this format: $100 </div> }
          </div>
          <div className={this.props.mode === "adding" ? "product-adding__form-group" : "product-editing__form-group"}>
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" name="amount" onChange={this.setProductAmountValue} value={this.state.amount} />
            { this.state.errorsInInputs.inAmount && <div className={this.props.mode === "adding" ? "product-adding__form-error" : "product-editing__form-error"}> The amount value must be a number greater than 0 </div> }
          </div>
          {
            this.props.mode === "adding" 
            &&
            <div className="product-adding__form-buttons" >
              <button type="button" onClick={this.props.cancelAdding}>Cancel</button>
              <button type="submit" onClick={this.applyСhanges} disabled={this.state.isSaveButtonDisabled}>Save</button>
            </div>
          }
          {
            this.props.mode === "editing" 
            && 
            <div className="product-editing__form-buttons" >
              <button type="button" onClick={this.props.cancelEditing}>Cancel</button>
              <button type="submit" onClick={this.applyСhanges} disabled={this.state.isSaveButtonDisabled}>Save</button>
            </div>
          }
        </div>
      </section>
    );
  };

};