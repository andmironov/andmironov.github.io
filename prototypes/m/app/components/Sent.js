let React = require("react");
let ListItem = require("./ListItem.js");
let Direct = require("./Direct.js");

let Sent = React.createClass({

  render: function() {

    return (
      <div className="list">
        <Direct/>
        <div className="letters">Sent</div>
      </div>
    )
  }
});

module.exports = Sent;
