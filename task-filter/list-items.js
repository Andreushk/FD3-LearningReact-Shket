const ListItems = React.createClass({

  displayName: "ListItems",

  propTypes: {
    word: React.PropTypes.string.isRequired,
  },

  render: function() {
    return React.DOM.p(null, this.props.word);
  },

});