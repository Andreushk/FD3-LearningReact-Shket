const FilterBlock = React.createClass({

  displayName: "FilterBlock",

  propTypes: {
    defaultWordsArray: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired,
    ),
  },

  getInitialState: function() {
    return {
      defaultWordsArray: this.props.defaultWordsArray,
      wordsArrayForRender: this.props.defaultWordsArray,
      isSortActive: false,
      stringForSearch: "",
    };
  },

  toggleSorting: function() {
    this.state.isSortActive ? this.setState({isSortActive: false}, this.makeArrayUsingParametrs) : this.setState({isSortActive: true}, this.makeArrayUsingParametrs);
  },

  setValueForSearch: function(valueForSearch) {
    this.setState({stringForSearch: valueForSearch}, this.makeArrayUsingParametrs);
  },

  resetSettings: function() {
    this.setState({isSortActive: false, stringForSearch: ""}, this.makeArrayUsingParametrs);
  },

  makeArrayUsingParametrs: function() {
    let resultArray = [...this.state.defaultWordsArray];

    if (this.state.stringForSearch) {
      const newWordsArray = [];
      resultArray.forEach(word => {
        word.includes(this.state.stringForSearch) ? newWordsArray.push(word) : null;
      });
      resultArray = newWordsArray;
    }

    if (this.state.isSortActive) resultArray.sort();

    this.setState({wordsArrayForRender: resultArray});
  },

  render: function() {
    return React.DOM.div({className: "filter"},
      React.createElement(FilterControlls, {checked: this.state.isSortActive, inputValue: this.state.stringForSearch, toggleSorting: this.toggleSorting, setValueForSearch: this.setValueForSearch, resetSettings: this.resetSettings}),
      React.createElement(FilterItems, {wordsArray: this.state.wordsArrayForRender}),
    );
  },

});