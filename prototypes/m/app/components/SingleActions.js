import React from "react"
import classNames from "classnames"
import SelectorButton from "./SelectorButton"

let buttonConfigs = {
  inbox : {
    "main" : ["reply", "reply-all", "forward"]
  }
}

let SingleActions = React.createClass({

  render: function() {

    let selectorNavClassnames = classNames({
      'header-actions': true
    })

    let mainButtons = buttonConfigs["inbox"].main.map((buttonName, i) => {
      return <SelectorButton buttonName={buttonName} key={i} />;
    })

    return (
      <ul className={selectorNavClassnames}>
        {mainButtons}
      </ul>
    )
  }
});

module.exports = SingleActions
