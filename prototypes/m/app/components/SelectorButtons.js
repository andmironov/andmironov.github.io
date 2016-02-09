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
  }
}

let SelectorButtons = React.createClass({

  propTypes: {
    areSomeChecked: ReactPropTypes.bool,
    folderName: ReactPropTypes.string,
  },

  render: function() {

    let selectorNavClassnames = classNames({
      'selector-buttons': true,
      'selector-buttons_expanded': this.props.areSomeChecked,
    });

    let folderName = this.props.folderName;
    let mainButtons = buttonConfigs[folderName].main.map(buttonName => {
      return <SelectorButton buttonName={buttonName}/>;
    });

    return (
      <ul className={selectorNavClassnames}>
        {mainButtons}
      </ul>
    )
  }
});

module.exports = SelectorButtons;
