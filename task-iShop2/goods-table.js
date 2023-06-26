const GoodsTable = React.createClass({

  displayName: "GoodsTable",

  propTypes: {
    dataDefault: React.PropTypes.object.isRequired,
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
    for (const key in this.state.data) {
      const productCodeInData = this.state.data[key].productCode;

      if (productCodeInData === productCode) {
        const isUserWantsToDelete = confirm(`Are you sure you want to remove the ${this.state.data[key].phoneModel} from this catalog?`);
        if (!isUserWantsToDelete) return;
        const newData = {...this.state.data};
        delete newData[key];
        this.setState({data: newData});
      };
    };
  },

  render: function() {

    const dataKeys = Object.keys(this.state.data);

    const productsArray = dataKeys.map(item => {
      if (this.state.data[item].productCode === this.state.selectedProduct) {
        return React.createElement(TableItems, {key: this.state.data[item].productCode, isSelected: true, deleteBtnHandler: this.deleteProduct, 
        productSelectHandler: this.setSelectedProduct, name: this.state.data[item].phoneModel, image: this.state.data[item].phoneImage, 
        price: this.state.data[item].phonePrice, stockQuantity: this.state.data[item].stockQuantity, productCode: this.state.data[item].productCode});
      } else {
        return React.createElement(TableItems, {key: this.state.data[item].productCode, isSelected: false, deleteBtnHandler: this.deleteProduct, 
        productSelectHandler: this.setSelectedProduct, name: this.state.data[item].phoneModel, image: this.state.data[item].phoneImage, 
        price: this.state.data[item].phonePrice, stockQuantity: this.state.data[item].stockQuantity, productCode: this.state.data[item].productCode});
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