import React from"react"
import Sidebar from "./Sidebar"
import LetterStore from "../stores/LetterStore"

function getLetters(folderName) {
  return {
    allLetters: LetterStore.getAll(),
    inboxNewCount: LetterStore.countNewInFolder(folderName),
    areAllChecked: LetterStore.areAllInFolderChecked(folderName),
    areSomeChecked: LetterStore.areSomeInFolderChecked(folderName),
    checkedCount: LetterStore.countCheckedInFolder(folderName),
  }
}

let Mail = React.createClass({

  getInitialState: function() {
    return getLetters(this.props.params.folderName);
  },

  componentDidMount: function() {
    LetterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LetterStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="main-section">
        <div className="main-section__inner">
          <Sidebar/>
          {React.cloneElement (this.props.children, {allLetters: this.state.allLetters})}
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState(getLetters());
  },
});

module.exports = Mail;
