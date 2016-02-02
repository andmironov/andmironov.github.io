let React = require("react");
let ListItem = require("./ListItem.js");
let Direct = require("./Direct.js");
let ListHeader = require("./ListHeader.js");

let Sent = React.createClass({

  render: function() {

    return (
      <div className="list">
        <ListHeader/>
        <Direct/>
        <div className="letters">Sent</div>
      </div>
    )
  }
});

module.exports = Sent;
