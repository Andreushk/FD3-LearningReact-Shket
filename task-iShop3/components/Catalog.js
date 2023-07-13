/* Подклюение React */
import React from "react";
import PropTypes from "prop-types";

/* Подключение стилей */
import style from "./Catalog.css";

/* Подключение компонентов */
import {CatalogItem} from "./CatalogItem.js";
import {ProductInformation} from "./ProductInformation.js";
import {ProductAddOrEdit} from "./ProductAddOrEdit.js";


export class Catalog extends React.Component {

  static propTypes = {
    shopName: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        phoneModel: PropTypes.string.isRequired,
        phoneImage: PropTypes.string.isRequired,
        phonePrice: PropTypes.string.isRequired,
        stockQuantity: PropTypes.number.isRequired,
        productCode: PropTypes.number.isRequired,
      }),
    ),
  };

  state = {
    dataForRender: this.props.data,

    isSelectAllowed: true,
    isShowSelectedProductInformation: true,
    isShowProductAddingBlock: false,
    isShowProductEditingBlock: false,
    isButtonsDisabled: false,

    selectedProductCode: null,
    selectedProductData: null,
    lastProductCode: null,
    productEditingData: null,
  };

  setSelectedProduct = (productCode) => {
    const selectedProductData = {};
    this.state.dataForRender.forEach(product => {
      if (product.productCode === productCode) {
        selectedProductData.name = product.phoneModel;
        selectedProductData.price = product.phonePrice;
        selectedProductData.amount = product.stockQuantity;
      };
    });

    this.setState({selectedProductCode: productCode, selectedProductData: selectedProductData, isShowSelectedProductInformation: true, isShowProductEditingBlock: false});
  };

  setEditableProduct = (productCode) => {
    this.setState({selectedProductCode: productCode, isShowSelectedProductInformation: false}, () => {});
  };

  deleteProduct = (productCode, productName) => {
    const isUserWantsToDelete = confirm(`Are you sure you want to remove the ${productName} from this catalog?`);
    if (!isUserWantsToDelete) return;

    const dataWithoutProduct = this.state.dataForRender.filter(product => productCode !== product.productCode);
    this.setState({dataForRender: dataWithoutProduct, selectedProductCode: null, selectedProductData: null});
  };

  showAddingSection = () => {
    const arrayOfProductCodes = (this.state.dataForRender.map(product => product.productCode)).sort();
    const lastProductCode = arrayOfProductCodes[arrayOfProductCodes.length - 1];

    this.setState({isSelectAllowed: false, selectedProductCode: null, isShowProductAddingBlock: true, lastProductCode: lastProductCode, isShowProductEditingBlock: false, productEditingData: null, isButtonsDisabled: true});
  };

  saveNewProduct = (infoAboutProduct) => {
    const newProductObject = {
      phoneModel: infoAboutProduct.name,
      phoneImage: infoAboutProduct.imageURL,
      phonePrice: infoAboutProduct.price,
      stockQuantity: infoAboutProduct.amount,
      productCode: infoAboutProduct.code,
    };

    this.setState(prevState => ({
      dataForRender: prevState.dataForRender.concat(newProductObject),
      isSelectAllowed: true,
      isShowProductAddingBlock: false,
      isButtonsDisabled: false
    }));
  };

  cancelAdding = () => {
    this.setState({isSelectAllowed: true, isShowProductAddingBlock: false, isButtonsDisabled: false});
  };

  showEditingSection = (productCode) => {
    const editingProductData = this.state.dataForRender.find(product => product.productCode === productCode);
    this.setState({isShowProductEditingBlock: true, productEditingData: editingProductData, selectedProductCode: productCode, isShowProductAddingBlock: false, isShowSelectedProductInformation: false});
  };

  saveProductInformation = (infoAboutProduct) => {
    const productCode = infoAboutProduct.code;
  
    this.setState(prevState => ({
      dataForRender: prevState.dataForRender.map(product => {
        if (product.productCode === productCode) {
          return {
            ...product,
            phoneModel: infoAboutProduct.name,
            phoneImage: infoAboutProduct.imageURL,
            phonePrice: infoAboutProduct.price,
            stockQuantity: infoAboutProduct.amount
          };
        }
        return product;
      })
    }));
    this.setState({isShowProductEditingBlock: false, isButtonsDisabled: false, isSelectAllowed: true});
  };

  cancelEditing = () => {
    this.setState({isSelectAllowed: true, isShowProductEditingBlock: false, selectedProductCode: null, selectedProductData: null, isButtonsDisabled: false});
  };

  disableProductSelectionAndButtons = () => {
    this.setState({isSelectAllowed: false, isButtonsDisabled: true}, () => {});
  };
  
  render() {

    const products = this.state.dataForRender.map(product => {
      const isSelected = this.state.selectedProductCode === product.productCode ? true : false;
      return <CatalogItem key={product.productCode} isSelected={isSelected} isSelectAllowed={this.state.isSelectAllowed} isButtonsDisabled={this.state.isButtonsDisabled} 
      selectProduct={this.setSelectedProduct} deleteProduct={this.deleteProduct} editProduct={this.showEditingSection} setEditableProduct={this.setEditableProduct} name={product.phoneModel} 
      image={product.phoneImage} price={product.phonePrice} amount={product.stockQuantity} code={product.productCode} />;
    });
    
    return (
      <section className="catalog">
        <div className="catalog__title">
          <h1> {this.props.shopName} </h1>
        </div>
        <div className="catalog__table-container">
          <table>
            <thead>
              <tr>
                <th>Phone Model</th>
                <th>Image</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Controlls</th>
              </tr>
            </thead>
            <tbody>{products}</tbody>
          </table>
          <button type="button" disabled={this.state.isButtonsDisabled} onClick={this.showAddingSection}>Add new one</button>
        </div>
        {
          this.state.selectedProductCode && this.state.isShowSelectedProductInformation && <ProductInformation name={this.state.selectedProductData.name} price={this.state.selectedProductData.price} amount={this.state.selectedProductData.amount} />
        }
        {
          (this.state.isShowProductAddingBlock && <ProductAddOrEdit mode={"adding"} lastProductCode={this.state.lastProductCode} cancelAdding={this.cancelAdding} saveAdding={this.saveNewProduct}/>) 
          || 
          (this.state.isShowProductEditingBlock && <ProductAddOrEdit key={this.state.productEditingData.productCode} mode={"editing"} editingProductData={this.state.productEditingData} cancelEditing={this.cancelEditing} saveEditing={this.saveProductInformation} disableInterface={this.disableProductSelectionAndButtons}/>)
        }
      </section>
    );
  };

};