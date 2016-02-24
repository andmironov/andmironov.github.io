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
    let allMessages = this.props.allLetters.letters
    let currentFilter = this._getCurrentFilter()
    let filteredMessages = allMessages.filter(currentFilter)

    let areSomeChecked = this._areSomeMessagesChecked(filteredMessages)
    let areAllChecked = this._areAllMessagesChecked(filteredMessages)
    let checkedCount = this._checkedMessagesCount(filteredMessages)

    let currentFolderName = this.props.params.filterName


    return (
      <div className="folder">
        <FolderHeader filter={currentFilter} areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} currentFolderName={currentFolderName}/>
        <Direct/>
        <List letters={filteredMessages} areSomeChecked={areSomeChecked} />
      </div>
    )
  },

  _getCurrentFilter: function() {
    let currentFilterType = this.props.params.filterType
    let currentFilterName = this.props.params.filterName

    let filter

    switch (currentFilterType) {
      case "folder":
        filter = (message) => { return message.folder == currentFilterName }
      break
      case "starred":
        filter = (message) => { return message.starred == true }
      break
      case "tag":
        filter = (message) => { return message.tag == currentFilterName }
      break
    }

    return filter
  },


  _areSomeMessagesChecked: function(messages) {
    return messages.some(item => item.checked)
  },

  _areAllMessagesChecked: function(messages) {
    return messages.every(item => item.checked)
  },

  _checkedMessagesCount: function(messages) {
    let checkedInFolder = messages.filter(function(item) {
      return item.checked == true
    })
    return checkedInFolder.length
  }
})

module.exports = Filter
