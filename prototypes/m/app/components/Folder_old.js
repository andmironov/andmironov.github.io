import React from "react"
import List from "./List"
import FolderHeader from "./FolderHeader"
import FolderHeaderSticky from "./FolderHeaderSticky"
import Direct from "./Direct"
let ReactPropTypes = React.PropTypes

let Folder = React.createClass({

  propTypes: {
    allLetters: ReactPropTypes.object,
    newLettersCount: ReactPropTypes.object
  },

  render: function() {
    let allLetters = this.props.allLetters.letters
    let currentFolderName = this.props.params.folderName

    let lettersInCurrentFolder = allLetters.filter(function(item) {
      return item.folder == currentFolderName
    })

    let areSomeChecked = this._areSomeLettersInCurrentFolderChecked(lettersInCurrentFolder)
    let areAllChecked = this._areAllLettersInCurrentFolderChecked(lettersInCurrentFolder)
    let checkedCount = this._checkedLettersInCurrentFolderCount(lettersInCurrentFolder)

    return (
      <div className="folder">
        <FolderHeader areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} currentFolderName={currentFolderName}/>
        <FolderHeaderSticky areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} currentFolderName={currentFolderName}/>
        <Direct/>
        <List letters={lettersInCurrentFolder} areSomeChecked={areSomeChecked} />
      </div>
    )
  },

  _areSomeLettersInCurrentFolderChecked: function(lettersInCurrentFolder) {
    return lettersInCurrentFolder.some(item => item.checked)
  },

  _areAllLettersInCurrentFolderChecked: function(lettersInCurrentFolder) {
    return lettersInCurrentFolder.every(item => item.checked)
  },

  _checkedLettersInCurrentFolderCount: function(lettersInCurrentFolder) {
    let checkedInFolder = lettersInCurrentFolder.filter(function(item) {
      return item.checked == true
    })
    return checkedInFolder.length
  }
})

module.exports = Folder
