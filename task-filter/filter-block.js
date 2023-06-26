const FilterBlock = React.createClass({

  displayName: "FilterBlock",

  propTypes: {
    defaultWordsArray: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired,
    ),
  },

  getInitialState: function() {
    return {
      wordsArrayForRender: this.props.defaultWordsArray,
      isSortActive: false,
      stringForSearch: "",
    };
  },

  toggleSorting: function() {
    this.state.isSortActive ? this.setState({isSortActive: false}) : this.setState({isSortActive: true});
  },

  setValueForSearch: function(valueForSearch) {
    this.setState({stringForSearch: valueForSearch});
  },

  resetSettings: function() {
    this.setState({isSortActive: false, stringForSearch: ""});
  },

  makeArrayUsingParametrs: function() {
    let resultArray = [...this.state.wordsArrayForRender];

    if (this.state.stringForSearch) {
      const newWordsArray = [];
      resultArray.forEach(word => {
        word.includes(this.state.stringForSearch) ? newWordsArray.push(word) : null;
      });
      resultArray = newWordsArray;
    }

    if (this.state.isSortActive) resultArray.sort();

    return resultArray
  },

  render: function() {

    const wordsArray = this.makeArrayUsingParametrs();

    return React.DOM.div({className: "filter"},
      React.createElement(FilterControlls, {checked: this.state.isSortActive, inputValue: this.state.stringForSearch, toggleSorting: this.toggleSorting, setValueForSearch: this.setValueForSearch, resetSettings: this.resetSettings}),
      React.createElement(FilterItems, {wordsArray: wordsArray}),
    );

  },

});