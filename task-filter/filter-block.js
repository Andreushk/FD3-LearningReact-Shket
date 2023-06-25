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

  toggleSorting: function(e) {
    this.state.isSortActive ? this.setState({isSortActive: false}) : this.setState({isSortActive: true});
  },

  setValueForSearch: function(e) {
    e.preventDefault();
    this.setState({stringForSearch: e.target.value});
  },

  resetParametrs: function(e) {
    e.preventDefault();
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
    const arrayOfParagraphsWithWords = wordsArray.map(word => 
      React.createElement(ListItems, {key: word, word: word})
    );

    return React.DOM.div({className: "filter"},
      React.DOM.div({className: "filter__head"},
        React.DOM.input({type: "checkbox", checked: this.state.isSortActive, onChange: this.toggleSorting}),
        React.DOM.input({type: "text", value: this.state.stringForSearch, onChange: this.setValueForSearch}),
        React.DOM.button({type: "button", onClick: this.resetParametrs}, "Reset"),
      ),
      React.DOM.div({className: "filter__body"},
        React.DOM.div({className: "filter__items-container"}, arrayOfParagraphsWithWords),
      ),
    );

  },

});