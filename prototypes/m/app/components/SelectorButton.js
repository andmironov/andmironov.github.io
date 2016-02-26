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
        break

      case "spam":
        buttonIcon = <svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M10,16 L10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 L10,16 Z M10,18 L10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,14.418278 14.418278,18 10,18 L10,18 Z"></path><path d="M3.86838715,5.93930621 L15.1232051,15.3510708 L16.4062067,13.8168261 L5.1513888,4.40506152 L3.86838715,5.93930621 L3.86838715,5.93930621 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">Спам</div>
        break

      case "folder":
        buttonIcon = <svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M6.71777344,5 L9.69722436,7 L16,7 L16,15 L4,15 L4,5 L6.71777344,5 Z M2,3 L2,17 L18,17 L18,5 L10,5 L7.30277564,3 L2,3 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">В папку</div>
        break

      case "more":
        buttonIcon = <svg width="20px" height="20px"><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><circle cx="4" cy="10" r="2"></circle><circle cx="10" cy="10" r="2"></circle><circle cx="16" cy="10" r="2"></circle></g></svg>
        buttonLabel = <div className="selector-button__label"></div>
        break

      case "tag":
        buttonIcon = <svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M6.71777344,5 L9.69722436,7 L16,7 L16,15 L4,15 L4,5 L6.71777344,5 Z M2,3 L2,17 L18,17 L18,5 L10,5 L7.30277564,3 L2,3 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">В папку</div>
        break

      case "reply":
        buttonIcon = <svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M9.70710678,5.70710678 L8.29289322,4.29289322 L2.58578644,10 L8.29289322,15.7071068 L9.70710678,14.2928932 L6.41480017,11 L10.7583723,11 C12.6688315,11 14.008569,11.7313614 14.9421073,12.9720839 C15.2740931,13.413311 15.5299517,13.8901876 15.7168604,14.3662589 C15.82638,14.6452142 16.1151832,15.9278658 16.1151832,15.9278658 L18.0714205,15.5117699 L17.8633725,14.5336513 C17.7095657,13.8105421 17.3098639,12.7924697 16.5402528,11.7696153 C15.2439626,10.0467758 13.326436,9 10.7583723,9 L6.41479988,9 L9.70710678,5.70710678 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">Ответить</div>
        break

      case "reply-all":
        buttonIcon = <svg><g><rect opacity="0" fill="#FFFFFF" x="0" y="0" width="20" height="20"></rect><path d="M13.7071068,5.70710678 L12.2928932,4.29289322 L6.58578644,10 L12.2928932,15.7071068 L13.7071068,14.2928932 L10.4148002,11 L12.7583723,11 C14.6688315,11 16.008569,11.7313614 16.9421073,12.9720839 C17.2740931,13.413311 17.5299517,13.8901876 17.7168604,14.3662589 C17.82638,14.6452142 18.1151832,15.9278658 18.1151832,15.9278658 L20.0714205,15.5117699 L19.8633725,14.5336513 C19.7095657,13.8105421 19.3098639,12.7924697 18.5402528,11.7696153 C17.2439626,10.0467758 15.326436,9 12.7583723,9 L10.4147999,9 L13.7071068,5.70710678 Z"></path><path d="M3.22393808,9.99999981 L7.70710678,5.70710678 L6.29289322,4.29289322 L0.585786438,10 L6.29289322,15.7071068 L7.70710678,14.2928932 L3.22393808,9.99999981 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">Ответить всем</div>
        break

      case "forward":
        buttonIcon = <svg><g><rect opacity="0" fill="#FFFFFF" x="0" y="0" width="20" height="20"></rect><path d="M11.2928932,5.70710678 L12.7071068,4.29289322 L18.4142136,10 L12.7071068,15.7071068 L11.2928932,14.2928932 L14.5857864,11 L2,11 L2,8.99999999 L14.5857864,8.99999999 L11.2928932,5.70710678 Z"></path></g></svg>
        buttonLabel = <div className="selector-button__label">Переслать</div>
        break
    }

    return <li className={buttonClassnames}>{buttonIcon}{buttonLabel}</li>
  }
})

module.exports = SelectorButton
