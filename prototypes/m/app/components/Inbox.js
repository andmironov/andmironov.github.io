let React = require("react");

let ListItem = require("./ListItem.js");
let Direct = require("./Direct.js");
let InboxListHeader = require("./InboxListHeader.js");

let Inbox = React.createClass({

  render: function() {

    let letters = this.props.letters.map( function(item) {
      return <ListItem new={item.new} checked={item.checked} fav={item.fav} sender={item.sender}  subject={item.subject} snippet={item.snippet} date={item.date} key={Math.random()} />
    });

    return (
        <div>
          <InboxListHeader/>
          <Direct/>
          <div className="letters">{letters}</div>
        </div>
    )
  }
});

module.exports = Inbox;
