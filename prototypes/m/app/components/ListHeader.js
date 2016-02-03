import React from "react"
import classNames from "classnames"
import letterActions from "../actions/LetterActions.js"

let ListHeader = React.createClass({

  getInitialState: function() {
    return {
        isCheckboxNavOpened : false
    }
  },

  render: function() {
    let checkboxHoleClassnames = classNames({
      'checkbox__hole': true,
      'checkbox__hole_checked': this.props.areAllChecked,
    });

    let checkboxNavClassnames = classNames({
      'checkbox__nav': true,
      'checkbox__nav_opened': this.state.isCheckboxNavOpened,
    });

    return (
      <div className="list__header">
        <div className="checkbox">
          <div className={checkboxHoleClassnames} onClick={this._onToggleCheckAll}><svg viewBox="0 0 9 7" className="checkbox__hole-tick"><path d="M3.18937182,6.75830078 L0,3.46309132 L1.01985037,2.44324095 L3.18937178,4.80468826 L7.99406007,0 L9.05960657,1.06554661 L3.18937182,6.75830078 Z" ></path></svg></div>
          <div className="checkbox__bird" onClick={this._toggleCheckboxNavOpened}></div>
          <ul className={checkboxNavClassnames}>
            <li className="checkbox__nav-item"><a href="#">Выбрать все</a></li>
            <li className="checkbox__nav-item"><a href="#">Непрочитанные</a></li>
            <li className="checkbox__nav-item"><a href="#">Прочитанные</a></li>
          </ul>
        </div>
        <div className="refresh"></div>
        <div className="search">Поиск по входящим</div>
      </div>
    )
  },

  _toggleCheckboxNavOpened: function() {
    this.setState({
      isCheckboxNavOpened: this.state.isCheckboxNavOpened ? false : true,
    });
  },

  _onToggleCheckAll: function() {
    letterActions.toggleCheckAll();
  },

});

module.exports = ListHeader;
