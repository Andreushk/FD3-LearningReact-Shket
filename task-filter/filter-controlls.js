const FilterControlls = React.createClass({

  displayName: "FilterControlls",

  propTypes: {
    checked: React.PropTypes.bool.isRequired,
    inputValue: React.PropTypes.string.isRequired,
    setValueForSearch: React.PropTypes.func.isRequired,
    toggleSorting: React.PropTypes.func.isRequired,
    resetSettings: React.PropTypes.func.isRequired,
  },

  changeInputValue: function(e) {
    e.preventDefault();
    this.props.setValueForSearch(e.target.value);
  },

  render: function() {
    return React.DOM.div({className: "filter__controlls"},
      React.DOM.input({type: "checkbox", checked: this.props.checked, onChange: this.props.toggleSorting}),
      React.DOM.input({type: "text", value: this.props.inputValue, onChange: this.changeInputValue}),
      React.DOM.button({type: "button", onClick: this.props.resetSettings}, "Reset"),
    );
  },

});