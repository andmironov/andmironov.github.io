import React from"react"
import Sidebar from "./Sidebar"
import LetterStore from "../stores/LetterStore"

let Mail = React.createClass({

  getInitialState: function() {
    return getData(this.props.params.folderName);
  },

  componentDidMount: function() {
    LetterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LetterStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps: function() {
    this.setState(getData(this.props.params.folderName))
  },

  render: function() {
    return (
      <div className="main-section">
        <div className="main-section__inner">
          <Sidebar newLettersCount={this.state.newLettersCount} />
          {React.cloneElement (this.props.children, {...this.state})}
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState(getData(this.props.params.folderName))
  }
})

function getData(folderName) {
  return {
    folderName: folderName,
    allLetters: LetterStore.getAll(),
    newLettersCount: LetterStore.countNewInFolders(),
    areAllChecked: LetterStore.areAllInFolderChecked(folderName),
    areSomeChecked: LetterStore.areSomeInFolderChecked(folderName),
    checkedCount: LetterStore.countCheckedInFolder(folderName),
  }
}


module.exports = Mail
