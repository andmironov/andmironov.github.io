let React = require("react");
let ReactPropTypes = React.PropTypes;
let ListItem = require("./ListItem.js");

let Folder = React.createClass({

  propTypes: {
    allLetters: ReactPropTypes.object,
    folderName: ReactPropTypes.string
  },

  render: function() {
    let folderName = this.props.folderName;
    let allLetters = this.props.allLetters.letters;

    let letters;
    letters = allLetters.filter(function(item) {
      return item.folder === folderName
    })

    let listItems;
    listItems = letters.map(function(listItem) {
      return <ListItem letter={listItem} key={listItem.id}/>
    })

    return (
        <div className="letters">{listItems}</div>
    )
  }
});

module.exports = Folder;
