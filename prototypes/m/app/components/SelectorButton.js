import React from "react"
import classNames from "classnames"
let ReactPropTypes = React.PropTypes

let SelectorButton = React.createClass({

  propTypes: {
    buttonName: ReactPropTypes.string,
  },

  render: function() {

    let buttonClassnames = classNames({
      'selector-button': true
    });

    return <li className={buttonClassnames}></li>
  }
});

module.exports = SelectorButton;
