import React from "react"
import classNames from "classnames"
import letterActions from "../actions/LetterActions"
import Selector from "./Selector"
import Search from "./Search"
import SendButton from "./SendButton"
let ReactPropTypes = React.PropTypes

let StickyFolderHeader = React.createClass({

  propTypes: {
    areAllChecked: ReactPropTypes.bool,
    areSomeChecked: ReactPropTypes.bool,
    checkedCount: ReactPropTypes.number
  },

  getInitialState: function() {
    return {
      isStickyHeaderExpanded: false
    }
  },

  componentDidUpdate: function() {
    this._handleScroll()
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this._handleScroll)
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this._handleScroll)
  },

  render: function() {

    let stickyHeaderClassnames = classNames({
      'folder-header': true,
      'folder-header_sticky': true,
      'folder-header_expanded': this.state.isStickyHeaderExpanded
    })

    return (
      <div className={stickyHeaderClassnames}>
        <div className="folder-header__inner">
          <div className="folder-header__sidebar">
            <SendButton/>
          </div>
          <div className="folder-header__main">
            <Selector {...this.props} />
            <div className="refresh"></div>
            <Search/>
          </div>
        </div>
      </div>
    )
  },

  _handleScroll: function() {
    //TODO: fix the logic

    let latestScrollY = window.pageYOffset || document.documentElement.scrollTop

    if (latestScrollY >= 176 && this.state.isStickyHeaderExpanded && this.props.areSomeChecked) return
    if (latestScrollY < 176 && !this.state.isStickyHeaderExpanded) return

    if (latestScrollY >= 176 && this.props.areSomeChecked) return this._showStickyHeader()
    if (latestScrollY < 176) return this._hideStickyHeader()

    if (latestScrollY >= 176 && this.state.isStickyHeaderExpanded && !this.props.areSomeChecked) return this._hideStickyHeader()
  },

  _showStickyHeader: function() {
    this.setState({ isStickyHeaderExpanded: true })
  },

  _hideStickyHeader: function() {
    this.setState({ isStickyHeaderExpanded: false })
  }

})

module.exports = StickyFolderHeader
