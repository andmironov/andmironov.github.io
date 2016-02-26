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

    let isEmpty = this._isEmpty(filteredMessages)
    let areSomeChecked = this._areSomeMessagesChecked(filteredMessages)
    let areAllChecked = this._areAllMessagesChecked(filteredMessages)
    let checkedCount = this._checkedMessagesCount(filteredMessages)

    return (
      <div className="folder">
        <FolderHeader filter={currentFilter} areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} isEmpty={isEmpty}/>
        <FolderHeaderSticky filter={currentFilter} areSomeChecked={areSomeChecked} areAllChecked={areAllChecked} checkedCount={checkedCount} isEmpty={isEmpty}/>
        <Direct/>
        <List letters={filteredMessages} areSomeChecked={areSomeChecked} isEmpty={isEmpty}/>
      </div>
    )
  },

  _getCurrentFilter: function() {
    let filterType = this.props.params.filterType

    let filter

    switch (filterType) {
      case "folder":
        filter = (message) => { return message.folder == this.props.params.filterName }
      break

      case "faved":
        filter = (message) => { return message.faved }
      break

      case "tag":
        filter = (message) => { return message.tag == this.props.params.filterName }
      break
    }

    return filter
  },

  _isEmpty: function(messages) {
    if (messages.length > 0) return false
    return true
  },

  _areSomeMessagesChecked: function(messages) {
    return messages.some(massage => massage.checked)
  },

  _areAllMessagesChecked: function(messages) {
    if (messages.length > 0) return messages.every(massage => massage.checked)
    return false
  },

  _checkedMessagesCount: function(messages) {
    let checked = messages.filter(function(message) {
      return message.checked == true
    })
    return checked.length
  }
})

module.exports = Filter
