let React = require("react");
let ListItem = require("./ListItem.js");
let Direct = require("./Direct.js");
let ListHeader = require("./ListHeader.js");

let Sent = React.createClass({

  render: function() {

    let letters = this.props.lettersData.map( function(item) {
      return <ListItem new={item.new} checked={item.checked} fav={item.fav} sender={item.sender}  subject={item.subject} snippet={item.snippet} date={item.date} key={Math.random()} />
    });

    return (
      <div className="list">
        <ListHeader/>
        <Direct/>
        <div className="letters">{letters}</div>
      </div>
    )
  }
});

module.exports = Sent;
