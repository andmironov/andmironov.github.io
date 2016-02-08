import React from "react"
import classNames from "classnames"
import letterActions from "../actions/LetterActions"
import Selector from "./Selector"
import Search from "./Search"

let ReactPropTypes = React.PropTypes

let FolderHeader = React.createClass({

  propTypes: {
    areAllChecked: ReactPropTypes.bool,
    areSomeChecked: ReactPropTypes.bool,
    folderName: ReactPropTypes.string
  },

  render: function() {
    return (
      <div className="folder-header">
        <Selector areAllChecked={this.props.areAllChecked} areSomeChecked={this.props.areSomeChecked} folderName={this.props.folderName}/>
        <div className="refresh"></div>
        <Search/>
      </div>
    )
  }
});

module.exports = FolderHeader;
