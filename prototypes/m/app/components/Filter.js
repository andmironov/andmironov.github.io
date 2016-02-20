import React from "react"
import List from "./List"
import FolderHeader from "./FolderHeader"
import FolderHeaderSticky from "./FolderHeaderSticky"
import Direct from "./Direct"
let ReactPropTypes = React.PropTypes

let Filter = React.createClass({

  propTypes: {
    allLetters: ReactPropTypes.object,
    newLettersCount: ReactPropTypes.object,
  },

  render: function() {
    //REVIEW: FIX LOGIC, USE REDUX?
    let allLetters = this.props.allLetters.letters
    let currentFilterType = "starred";
    let lettersInCurrentFilter = this._getFilteredLetters(allLetters, "starred")

    let areSomeChecked = this._areSomeLettersInCurrentFilterChecked(lettersInCurrentFilter)
    let areAllChecked = this._areAllLettersInCurrentFilterChecked(lettersInCurrentFilter)
    let checkedCount = this._checkedLettersInCurrentFilterCount(lettersInCurrentFilter)

    return (
      <div className="folder">
        <FolderHeader areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} currentFolderName={currentFilterType}/>
        <FolderHeaderSticky areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} currentFolderName={currentFilterType}/>
        <Direct/>
        <List letters={lettersInCurrentFilter} areSomeChecked={areSomeChecked} />
      </div>
    )
  },

  _getFilteredLetters: function(letters, filterType) {
    let fileredLetters

    switch (filterType) {
      case "starred":
        fileredLetters = letters.filter(function(item) {
          return item.faved == true
        })
      break
    }
    return fileredLetters
  },

  _areSomeLettersInCurrentFilterChecked: function(lettersInCurrentFilter) {
    return lettersInCurrentFilter.some(item => item.checked)
  },

  _areAllLettersInCurrentFilterChecked: function(lettersInCurrentFilter) {
    return lettersInCurrentFilter.every(item => item.checked)
  },

  _checkedLettersInCurrentFilterCount: function(lettersInCurrentFilter) {
    let checkedInFolder = lettersInCurrentFilter.filter(function(item) {
      return item.checked == true
    })
    return checkedInFolder.length
  }
})

module.exports = Filter
