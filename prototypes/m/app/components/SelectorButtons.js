import React from "react"
import classNames from "classnames"
import SelectorButton from "./SelectorButton"
let ReactPropTypes = React.PropTypes

let buttonConfigs = {
  inbox : {
    "main" : ["folder", "trash", "spam"],
    "more" : ["tag"]
  },
  sent: {
    "main" : ["folder", "trash"],
    "more" : ["tag"]
  },
  starred: {
    "main" : ["folder", "trash", "unstar"],
    "more" : ["tag"]
  }
}

let SelectorButtons = React.createClass({

  propTypes: {
    areSomeChecked: ReactPropTypes.bool,
    currentFolderName: ReactPropTypes.string,
  },

  render: function() {

    let selectorNavClassnames = classNames({
      'selector-buttons': true,
      'selector-buttons_expanded': this.props.areSomeChecked,
    });

    let currentFolderName = this.props.currentFolderName

    let mainButtons = buttonConfigs[currentFolderName].main.map((buttonName, i) => {
      return <SelectorButton buttonName={buttonName} key={i} />;
    });

    return (
      <ul className={selectorNavClassnames}>
        {mainButtons}
      </ul>
    )
  }
});

module.exports = SelectorButtons
