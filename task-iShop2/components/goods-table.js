import React from "react";
import {TableItem} from "./shop-item";

import "./goods-table-style.css";

export const GoodsTable = React.createClass({

  displayName: "GoodsTable",

  propTypes: {
    dataDefault: React.PropTypes.array.isRequired,
    shopName: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      data: this.props.dataDefault,
      selectedProduct: null,
    };
  },

  setSelectedProduct: function(productCode) {
    this.setState({selectedProduct: productCode});
  },

  deleteProduct: function(productCode, productName) {
    const isUserWantsToDelete = confirm(`Are you sure you want to remove the ${productName} from this catalog?`);
    if (!isUserWantsToDelete) return;

    const arrayWithoutDeletedProduct = this.state.data.filter((item) => {
      if (item.productCode !== productCode) return item;
    });

    this.setState({data: arrayWithoutDeletedProduct});
  },

  render: function() {
    const productsArray = this.state.data.map(item => {
      const isSelected = item.productCode === this.state.selectedProduct;
      
      return React.createElement(TableItem, {key: item.productCode, isSelected: isSelected, deleteBtnHandler: this.deleteProduct, 
      productSelectHandler: this.setSelectedProduct, name: item.phoneModel, image: item.phoneImage, 
      price: item.phonePrice, stockQuantity: item.stockQuantity, productCode: item.productCode});   
    });
    
    return React.DOM.div({className: "goods-table-container"}, 
      React.DOM.h1(null, this.props.shopName),
      React.DOM.table(null, 
        React.DOM.thead(null, 
          React.DOM.tr(null,
            React.DOM.th(null, "Phone Model"),
            React.DOM.th(null, "Image"),
            React.DOM.th(null, "Price"),
            React.DOM.th(null, "Amount"),
            React.DOM.th(null, "Controlls"),
          ),
        ),
        React.DOM.tbody(null, productsArray),
      ),
    );
  },
  
});