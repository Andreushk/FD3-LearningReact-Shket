const TableItems = React.createClass({
  displayName: "TableItems",

  propTypes: {
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    stockQuantity: React.PropTypes.number.isRequired,
  },

  render: function() {
    return React.DOM.tr({key: this.props.itemKey}, 
      React.DOM.td(null, this.props.name),
      React.DOM.td(null, 
        React.DOM.img({src: this.props.image}),  
      ),
      React.DOM.td(null, this.props.price),
      React.DOM.td(null, this.props.stockQuantity),
    );
  },
});
