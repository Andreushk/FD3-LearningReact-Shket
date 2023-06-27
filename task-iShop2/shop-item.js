const TableItems = React.createClass({

  displayName: "TableItems",

  propTypes: {
    isSelected: React.PropTypes.bool.isRequired,
    deleteBtnHandler: React.PropTypes.func.isRequired,
    productSelectHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    stockQuantity: React.PropTypes.number.isRequired,
    productCode: React.PropTypes.number.isRequired,
  },

  getProductCodeForDelete: function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.deleteBtnHandler(this.props.productCode, this.props.name);
  },

  getProductCodeForMark: function(event) {
    event.preventDefault();
    this.props.productSelectHandler(this.props.productCode);
  },

  render: function() {
    const styleClass = this.props.isSelected === true ? "selected-tr" : "";
    return React.DOM.tr({className: styleClass, onClick: this.getProductCodeForMark},
      React.DOM.td(null, this.props.name),
      React.DOM.td(null, 
        React.DOM.img({src: this.props.image}),  
      ),
      React.DOM.td(null, this.props.price),
      React.DOM.td(null, this.props.stockQuantity),
      React.DOM.td(null, 
        React.DOM.button({className: "delete-button", onClick: this.getProductCodeForDelete}, "Delete"),
      ),
    );
  },
});