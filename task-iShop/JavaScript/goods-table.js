const GoodsTable = React.createClass({

  displayName: "GoodsTable",

  propTypes: {
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        phoneModel: React.PropTypes.string.isRequired,
        phoneImage: React.PropTypes.string.isRequired,
        phonePrice: React.PropTypes.string.isRequired,
        stockQuantity: React.PropTypes.number.isRequired,
        productNumber: React.PropTypes.number.isRequired,
      }),
    ),
  },

  render: function() {

    const tableItems = this.props.data.map(a => React.createElement(TableItems, {key: a.productNumber, 
      name: a.phoneModel, image: a.phoneImage, price: a.phonePrice, stockQuantity: a.stockQuantity})
    );
    
    return React.DOM.table(null, 
      React.DOM.thead(null, 
        React.DOM.tr(null, 
          React.DOM.th(null, "Phone Model"),
          React.DOM.th(null, "Image"),
          React.DOM.th(null, "Price"),
          React.DOM.th(null, "Amount"),
        ),
      ), 
      React.DOM.tbody(null, tableItems),
    );
  },

});