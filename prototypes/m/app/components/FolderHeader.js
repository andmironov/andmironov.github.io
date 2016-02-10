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
    checkedCount: ReactPropTypes.number,
  },

  render: function() {
    return (
      <div className="folder-header">
        <Selector {...this.props} />
        <div className="refresh"></div>
        <Search/>
      </div>
    )
  }
});

module.exports = FolderHeader;
