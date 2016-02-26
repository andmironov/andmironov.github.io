import React from "react"
import classNames from "classnames"
import LetterActions from "../actions/LetterActions"
import SelectorButtons from "./SelectorButtons"
let ReactPropTypes = React.PropTypes

let Selector = React.createClass({

  propTypes: {
    isEmpty: ReactPropTypes.bool,
    areAllChecked: ReactPropTypes.bool,
    areSomeChecked: ReactPropTypes.bool,
    checkedCount: ReactPropTypes.number
  },

  getInitialState: function() {
    return {
      isCheckboxNavOpened: false
    }
  },

  componentWillReceiveProps: function() {
    this.setState({
      isCheckboxNavOpened:false
    })
  },

  render: function() {

    let selectorClassnames = classNames({
      'selector': true,
      'selector_disabled': this.props.isEmpty,
      'selector_all-checked': this.props.areAllChecked,
      'selector_some-checked': this.props.areSomeChecked,
      'selector_nav-opened': this.state.isCheckboxNavOpened
    })

    return (
      <div className={selectorClassnames}>
        <div className="selector__checkbox" onClick={this._toggleCheckAll}>
          <svg viewBox="0 0 9 7" className="selector__checkbox-tick"><path d="M3.18937182,6.75830078 L0,3.46309132 L1.01985037,2.44324095 L3.18937178,4.80468826 L7.99406007,0 L9.05960657,1.06554661 L3.18937182,6.75830078 Z" ></path></svg>
          <div className="selector__checkbox-minus"></div>
        </div>

        <div className="selector__counter" onClick={this._toggleCheckboxNavOpened}>{this.props.checkedCount} выбрано</div>

        <div className="selector__bird" onClick={this._toggleCheckboxNavOpened}>
          <svg><path d="M6,4.82842712 L1.75735931,0.585786438 L0.343145751,2 L5.29289322,6.94974747 L6,7.65685425 L11.6568542,2 L10.2426407,0.585786438 L6,4.82842712 L6,4.82842712 L6,4.82842712 Z"></path></svg>
        </div>

        <ul className="selector__nav">
          <li className="selector__nav-item"><a href="#" onClick={this._checkAll}>Выбрать все</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkNew}>Непрочитанные</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkNotNew}>Прочитанные</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkFaved}>Отмеченные</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkUnFaved}>Неотмеченные</a></li>
          <li className="selector__nav-item"><a href="#" onClick={this._checkNone}>Ни одного</a></li>
        </ul>
        <SelectorButtons {...this.props} />
      </div>
    )
  },

  _toggleCheckboxNavOpened: function() {
    if (this.props.isEmpty) return false 
    this.setState({
      isCheckboxNavOpened: this.state.isCheckboxNavOpened ? false : true,
    });
  },

  _checkAll: function(e) {
    e.preventDefault()
    LetterActions.checkFiltered(this.props.filter)
  },

  _checkNone: function(e) {
    e.preventDefault()
    LetterActions.unCheckFiltered(this.props.filter)
  },

  _toggleCheckAll: function() {
    LetterActions.toggleCheckFiltered(this.props.filter)
  },

  _checkFaved: function(e) {
    e.preventDefault()
    LetterActions.checkFavedFiltered(this.props.filter)
  },

  _checkUnFaved: function(e) {
    e.preventDefault()
    LetterActions.checkUnFavedFiltered(this.props.filter)
  },

  _checkNew: function(e) {
    e.preventDefault()
    LetterActions.checkNewFiltered(this.props.filter)
  },

  _checkNotNew: function(e) {
    e.preventDefault()
    LetterActions.checkNotNewFiltered(this.props.filter)
  },

});

module.exports = Selector
