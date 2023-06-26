const FilterItems = React.createClass({

  displayName: "FilterItems",

  propTypes: {
    wordsArray: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired,
    ),
  },

  render: function() {
    const arrayOfParagraphsWithWords = this.props.wordsArray.map(word => React.DOM.p({key: word}, word));
    return React.DOM.div({className: "filter__items"}, 
      React.DOM.div({className: "filter__items-container"}, arrayOfParagraphsWithWords),
    );
  },

});