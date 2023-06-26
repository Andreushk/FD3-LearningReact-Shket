const GoodsTable = React.createClass({

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

  deleteProduct: function(productCode) {

    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].productCode === productCode) {
        const isUserWantsToDelete = confirm(`Are you sure you want to remove the ${this.state.data[i].phoneModel} from this catalog?`);
        if (!isUserWantsToDelete) return;
        const newArray = [...this.state.data];
        newArray.splice(i, 1);
        this.setState({data: newArray});
      }
    };

  },

  render: function() {
    const productsArray = this.state.data.map(item => {
      if (item.productCode === this.state.selectedProduct) {
        return React.createElement(TableItems, {key: item.productCode, isSelected: true, deleteBtnHandler: this.deleteProduct, 
        productSelectHandler: this.setSelectedProduct, name: item.phoneModel, image: item.phoneImage, 
        price: item.phonePrice, stockQuantity: item.stockQuantity, productCode: item.productCode});
      } else {
        return React.createElement(TableItems, {key: item.productCode, isSelected: false, deleteBtnHandler: this.deleteProduct, 
        productSelectHandler: this.setSelectedProduct, name: item.phoneModel, image: item.phoneImage, 
        price: item.phonePrice, stockQuantity: item.stockQuantity, productCode: item.productCode});
      };      
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