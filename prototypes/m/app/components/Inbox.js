let React = require("react");
let ReactPropTypes = React.PropTypes;

let LetterActions = require('../actions/LetterActions');

let ListItem = require("./ListItem.js");
let Direct = require("./Direct.js");
let InboxListHeader = require("./InboxListHeader.js");

let Inbox = React.createClass({

  propTypes: {
    allLetters: ReactPropTypes.object,
  },

  render: function() {
    let allLetters = this.props.allLetters.letters;

    let letters;
    letters = allLetters.filter(function(item) {
      return item.folder === "inbox"
    })

    let listItems;
    listItems = letters.map(function(listItem) {
      return <ListItem letter={listItem} key={listItem.id}/>
    })

    return (
      <div>
        <InboxListHeader/>
        <Direct/>
        <div className="letters">{listItems}</div>
      </div>
    )
  }
});

module.exports = Inbox;
