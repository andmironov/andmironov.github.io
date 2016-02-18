import React from "react"
import { Link } from "react-router"
import classNames from "classnames"
let ReactPropTypes = React.PropTypes

let SendButton = React.createClass({

  propTypes: {
    routes: ReactPropTypes.array
  },

  render: function() {
    let currentPath = this.props.routes && this.props.routes[this.props.routes.length-1].path
    let buttonText = (currentPath == "compose") ? "Отправить письмо" : "Написать письмо"

    return <Link to="mail/compose" className="send-button" activeClassName="send-button_active" >{buttonText}</Link>
  }
})

module.exports = SendButton
