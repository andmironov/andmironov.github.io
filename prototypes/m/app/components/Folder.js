import React from "react"
import List from "./List"
import FolderHeader from "./FolderHeader"
import Direct from "./Direct"
import LetterStore from "../stores/LetterStore"
let ReactPropTypes = React.PropTypes

function getFolderState(folderName) {
  return {
    folderName: folderName,
    areAllChecked: LetterStore.areAllInFolderChecked(folderName),
    areSomeChecked: LetterStore.areSomeInFolderChecked(folderName),
    checkedCount: LetterStore.countCheckedInFolder(folderName),
  }
}

let Folder = React.createClass({

  propTypes: {
    allLetters: ReactPropTypes.object,
    params: ReactPropTypes.object
  },

  getInitialState: function() {
    return getFolderState(this.props.params.folderName)
  },

  componentWillReceiveProps: function() {
    this.setState(getFolderState(this.props.params.folderName));
  },

  render: function() {
    let allLetters = this.props.allLetters.letters;
    let folderName = this.props.params.folderName ? this.props.params.folderName : "inbox";
    let letters = allLetters.filter(function(item) {
      return item.folder == folderName
    })

    return (
      <div className="folder">
        <FolderHeader checkedCount={this.state.checkedCount} areAllChecked={this.state.areAllChecked} areSomeChecked={this.state.areSomeChecked} folderName={this.state.folderName}/>
        <Direct/>
        <List letters={letters} />
      </div>
    )
  }
});

module.exports = Folder;
