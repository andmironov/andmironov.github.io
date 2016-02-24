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
    let currentFilter = this._getCurrentFilter()

    let filteredLetters = allLetters.filter(currentFilter)

    let currentFolderName = this.props.params.filterType
    let areSomeChecked = this._areSomeLettersInCurrentFolderChecked(filteredLetters)
    let areAllChecked = this._areAllLettersInCurrentFolderChecked(filteredLetters)
    let checkedCount = this._checkedLettersInCurrentFolderCount(filteredLetters)

    return (
      <div className="folder">
        <FolderHeader       areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} currentFolderName={currentFolderName}/>
        <FolderHeaderSticky areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} currentFolderName={currentFolderName}/>
        <Direct/>
        <List letters={filteredLetters} areSomeChecked={areSomeChecked} />
      </div>
    )
  },

  _getCurrentFilter: function() {
    let currentFilterType = this.props.params.filterType
    let currentFilterName = this.props.routes[this.props.routes.length-1].name

    return (message) => {
      return message['folder'] == currentFilterName
    }
  },

  _areSomeLettersInCurrentFolderChecked: function(filteredLetters) {
    return filteredLetters.some(item => item.checked)
  },

  _areAllLettersInCurrentFolderChecked: function(filteredLetters) {
    return filteredLetters.every(item => item.checked)
  },

  _checkedLettersInCurrentFolderCount: function(filteredLetters) {
    let checkedInFolder = filteredLetters.filter(function(item) {
      return item.checked == true
    })
    return checkedInFolder.length
  }
})

module.exports = Folder
