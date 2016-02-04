import React from "react"
import classNames from "classnames"
import letterActions from "../actions/LetterActions.js"
let ReactPropTypes = React.PropTypes

let Selector = React.createClass({

  propTypes: {
    areAllChecked: ReactPropTypes.bool,
    areSomeChecked: ReactPropTypes.bool,
    folderName: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
        isCheckboxNavOpened:false
    }
  },

  componentWillReceiveProps: function() {
    this.setState({isCheckboxNavOpened:false})
  },

  render: function() {
    let selectorClassnames = classNames({
      'selector__checkbox': true,
      'selector__checkbox_all-checked': this.props.areAllChecked,
      'selector__checkbox_some-checked': this.props.areSomeChecked,
    });

    let selectorNavClassnames = classNames({
      'selector__nav': true,
      'selector__nav_opened': this.state.isCheckboxNavOpened,
    });

    return (
      <div className="selector">
        <div className={selectorClassnames} onClick={this._toggleCheckAll}>
          <svg viewBox="0 0 9 7" className="selector__checkbox-tick"><path d="M3.18937182,6.75830078 L0,3.46309132 L1.01985037,2.44324095 L3.18937178,4.80468826 L7.99406007,0 L9.05960657,1.06554661 L3.18937182,6.75830078 Z" ></path></svg>
          <div className="selector__checkbox-minus"></div>
        </div>
        <div className="selector__bird" onClick={this._toggleCheckboxNavOpened}></div>
        <ul className={selectorNavClassnames}>
          <li className="selector__nav-item"><a href="#" onClick={this._checkNew}>Новые</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkNotNew}>Прочитанные</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkFaved}>Помеченные</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkUnFaved}>Непомеченные</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkNone}>Ни одного</a></li>
        </ul>
      </div>
    )
  },

  _toggleCheckboxNavOpened: function() {
    this.setState({
      isCheckboxNavOpened: this.state.isCheckboxNavOpened ? false : true,
    });
  },

  _checkAll: function() {
    e.preventDefault()
    letterActions.checkAllInFolder(this.props.folderName);
  },

  _checkNone: function(e) {
    e.preventDefault()
    letterActions.сheckNoneInFolder(this.props.folderName);
  },

  _toggleCheckAll: function() {
    letterActions.toggleCheckAllInFolder(this.props.folderName);
  },

  _checkFaved: function(e) {
    e.preventDefault()
    letterActions.checkFavedInFolder(this.props.folderName);
  },

  _checkUnFaved: function(e) {
    e.preventDefault()
    letterActions.checkUnFavedInFolder(this.props.folderName);
  },

  _checkNew: function(e) {
    e.preventDefault()
    letterActions.checkNewInFolder(this.props.folderName);
  },

  _checkNotNew: function(e) {
    e.preventDefault()
    letterActions.checkNotNewInFolder(this.props.folderName);
  },

});

module.exports = Selector;
