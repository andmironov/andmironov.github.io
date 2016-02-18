import React from "react"
import SendButton from "./SendButton"
import SidebarAd from "./SidebarAd"
import SidebarNav from "./SidebarNav"

let ReactPropTypes = React.PropTypes

let Sidebar = React.createClass({

  propTypes: {
    newLettersCount: ReactPropTypes.object
  },

  render: function() {
    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <SendButton {...this.props} />
          <SidebarNav {...this.props}/>
        </div>
        <SidebarAd/>
      </div>
    )
  }
});

module.exports = Sidebar
