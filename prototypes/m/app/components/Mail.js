import React from"react"
import Sidebar from "./Sidebar"
import LetterStore from "../stores/LetterStore"

let Mail = React.createClass({

  getInitialState: function() {
    return getData()
  },

  componentDidMount: function() {
    LetterStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function() {
    LetterStore.removeChangeListener(this._onChange)
  },

  componentWillReceiveProps: function() {
    this.setState(getData())
  },

  render: function() {
    return (
      <div className="main-section">
        <div className="main-section__inner">
          <Sidebar {...this.props} newLettersCount={this.state.newLettersCount} />
          {React.cloneElement (this.props.children, {...this.state})}
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState(getData())
  }
})

function getData() {
  return {
    allLetters: LetterStore.getAll(),
    newLettersCount: LetterStore.countNewInFolders()
  }
}


module.exports = Mail
