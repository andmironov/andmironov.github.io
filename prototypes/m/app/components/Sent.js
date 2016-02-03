let React = require("react");
let ReactPropTypes = React.PropTypes;

let LetterActions = require('../actions/LetterActions');

let ListItem = require("./ListItem.js");
let Direct = require("./Direct.js");
let SentListHeader = require("./SentListHeader.js");

let Sent = React.createClass({

  propTypes: {
    allLetters: ReactPropTypes.object,
  },

  render: function() {
    let allLetters = this.props.allLetters.letters;

    let letters;
    letters = allLetters.filter(function(item) {
      return item.folder === "sent"
    })

    let listItems;
    listItems = letters.map(function(listItem) {
      return <ListItem letter={listItem} key={listItem.id}/>
    })

    return (
      <div>
        <SentListHeader/>
        <Direct/>
        <div className="letters">{listItems}</div>
      </div>
    )
  }
});

module.exports = Sent;
