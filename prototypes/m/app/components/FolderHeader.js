import React from "react"
import classNames from "classnames"
import letterActions from "../actions/LetterActions"
import Selector from "./Selector"

let ReactPropTypes = React.PropTypes

let FolderHeader = React.createClass({

  propTypes: {
    areAllChecked: ReactPropTypes.bool,
  },

  render: function() {
    return (
      <div className="folder-header">
        <Selector areAllChecked={this.props.areAllChecked}/>
        <div className="refresh"></div>
        <div className="search">Поиск по входящим</div>
      </div>
    )
  }
});

module.exports = FolderHeader;
