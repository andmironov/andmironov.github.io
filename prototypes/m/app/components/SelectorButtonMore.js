import React from "react"
import classNames from "classnames"
let ReactPropTypes = React.PropTypes

let SelectorButtonMore = React.createClass({

  propTypes: {
    buttons: ReactPropTypes.array,
  },

  getInitialState: function() {
    return {
      isDropdownOpened: false
    }
  },

  componentWillReceiveProps: function() {
    this.setState({
      isDropdownOpened:false
    })
  },

  render: function() {
    let buttonClassnames = classNames({
      'selector-button': true,
      'selector-button_more': true,
      'button-dropdown_opened': this.state.isDropdownOpened
    })

    let buttonIcon = <svg width="20px" height="20px"><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><circle cx="4" cy="10" r="2"></circle><circle cx="10" cy="10" r="2"></circle><circle cx="16" cy="10" r="2"></circle></g></svg>

    return (
      <li className={buttonClassnames} onClick={this._toggleDropdownOpened}>
        {buttonIcon}
        <ul className="button-dropdown">
          <li className="button-dropdown__item"><a href="#">Отметить как прочитанное</a></li>
          <li className="button-dropdown__item"><a href="#">Отметить как непрочитанное</a></li>
          <li className="button-dropdown__item"><a href="#">Присвоить ярлык</a></li>
          <li className="button-dropdown__item"><a href="#">Добавить в список дел</a></li>
        </ul>
      </li>
    )
  },

  _toggleDropdownOpened: function() {
    this.setState({
      isDropdownOpened: this.state.isDropdownOpened ? false : true,
    });
  },
})

module.exports = SelectorButtonMore
