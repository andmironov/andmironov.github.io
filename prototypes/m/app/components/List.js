let React = require("react");

import Sidebar from "./Sidebar.js"
import letterStore from "../stores/LetterStore.js"

function getLetters() {
  return {
    allLetters: letterStore.getAll()
  }
}

let List = React.createClass({

  getInitialState: function() {
    return getLetters();
  },

  componentDidMount: function() {
    letterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    letterStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getLetters());
  },

  render: function() {
    return (
      <div className="main-section">
        <Sidebar/>
        <div className="list">
          { React.cloneElement (this.props.children, {allLetters: this.state.allLetters}) }
        </div>
      </div>
    )
  }
});

module.exports = List;
