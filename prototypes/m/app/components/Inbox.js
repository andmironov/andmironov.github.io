let React = require("react");
let ListItem = require("./ListItem.js");
let Direct = require("./Direct.js");
let ListHeader = require("./ListHeader.js");

let Inbox = React.createClass({

  render: function() {


    return (
      <div className="list">
        <ListHeader/>
        <Direct/>
        <div className="letters">inbox</div>
      </div>
    )
  }
});

module.exports = Inbox;
