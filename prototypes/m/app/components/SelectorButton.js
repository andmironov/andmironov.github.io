import React from "react"
import classNames from "classnames"
let ReactPropTypes = React.PropTypes

let SelectorButton = React.createClass({

  propTypes: {
    buttonName: ReactPropTypes.string,
  },

  render: function() {
    let uniqueButtonClassName = 'selector-button_' + this.props.buttonName
    let buttonClassnames = classNames(uniqueButtonClassName, {
      'selector-button': true
    })

    let buttonIcon, buttonLabel
    switch (this.props.buttonName) {
      case "trash":
        buttonIcon = <svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M6,16 L14,16 L14,8 L6,8 L6,16 Z M4,6 L16,6 L16,18 L4,18 L4,6 L4,6 L4,6 Z"></path><path d="M8,3 L8,2 L12,2 L12,3 L16,3 L16,5 L4,5 L4,3 L8,3 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">В корзину</div>
        break;

      case "spam":
        buttonIcon = <svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M10,16 L10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 L10,16 Z M10,18 L10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,14.418278 14.418278,18 10,18 L10,18 Z"></path><path d="M3.86838715,5.93930621 L15.1232051,15.3510708 L16.4062067,13.8168261 L5.1513888,4.40506152 L3.86838715,5.93930621 L3.86838715,5.93930621 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">Спам</div>
        break;

      case "folder":
        buttonIcon = <svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M6.71777344,5 L9.69722436,7 L16,7 L16,15 L4,15 L4,5 L6.71777344,5 Z M2,3 L2,17 L18,17 L18,5 L10,5 L7.30277564,3 L2,3 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">В папку</div>
        break;
    }

    return <li className={buttonClassnames}>{buttonIcon}{buttonLabel}</li>
  }
})

module.exports = SelectorButton
