import React from "react"
import List from "./List"
import FolderHeader from "./FolderHeader"
import Direct from "./Direct"
let ReactPropTypes = React.PropTypes

let Folder = React.createClass({

  propTypes: {
    areAllChecked: ReactPropTypes.bool,
    allLetters: ReactPropTypes.object
  },

  render: function() {
    let allLetters = this.props.allLetters.letters;
    let folderName = this.props.params.folderName ? this.props.params.folderName : "inbox";
    let letters = allLetters.filter(function(item) {
      return item.folder === folderName
    })

    return (
      <div className="folder">
        <FolderHeader areAllChecked={this.props.areAllChecked} />
        <Direct/>
        <List letters={letters} />
      </div>
    )
  }
});

module.exports = Folder;
