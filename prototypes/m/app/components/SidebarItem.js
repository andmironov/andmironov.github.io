import React from "react"
import { Link } from "react-router"
import classNames from "classnames"
let ReactPropTypes = React.PropTypes

let SidebarItem = React.createClass({

  propTypes: {
    isCurrent: ReactPropTypes.bool,
    link: ReactPropTypes.string,
    title: ReactPropTypes.string,
    counter: ReactPropTypes.number,
    icon: ReactPropTypes.element

  },

  render: function() {

    let sidebarItemClassNames = classNames({
      "sidebar-nav__item": true,
      "sidebar-nav__item_current": this.props.isCurrent
    })

    return (
      <li className={sidebarItemClassNames}>
        <Link to={this.props.link}>
          <span className="sidebar-nav__item-icon sidebar-nav__item-icon_inbox">{this.props.icon}</span>
          <span className="sidebar-nav__item-title">{this.props.title}</span>
          <span className="sidebar-nav__item-counter">{this.props.counter}</span>
        </Link>
      </li>
    )
  }
})

module.exports = SidebarItem
