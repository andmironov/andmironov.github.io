let React = require("react");
let ReactPropTypes = React.PropTypes;

let Direct = require("./Direct.js");
let ListHeader = require("./ListHeader.js");
let Folder = require("./Folder.js");

let Inbox = React.createClass({

  propTypes: {
    allLetters: ReactPropTypes.object,
  },

  render: function() {
    let folderName = "inbox";

    return (
      <div>
        <ListHeader areAllChecked={this.props.areAllChecked} folderName={folderName}/>
        <Direct/>
        <Folder allLetters={this.props.allLetters} folderName={folderName}/>
      </div>
    )
  }
});

module.exports = Inbox;
