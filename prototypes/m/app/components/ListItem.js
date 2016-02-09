import React from 'react'
import classNames from "classnames";
import letterActions from "../actions/LetterActions.js"
let ReactPropTypes = React.PropTypes

let ListItem = React.createClass({

  propTypes: {
    letter: ReactPropTypes.object
  },

  render: function() {
    let letter = this.props.letter;

    let letterClassnames = classNames({
      'list-item': true,
      'list-item_reg': !letter.new && !letter.checked,
      'list-item_new': letter.new,
      'list-item_checked': letter.checked,
      'list-item_faved': letter.faved
    });

    return (
      <div className={letterClassnames}>
        <div className="list-item__checkbox" onClick={this._onToggleChecked}>
        <svg viewBox="0 0 9 7" className="list-item__checkbox-tick"><path d="M3.18937182,6.75830078 L0,3.46309132 L1.01985037,2.44324095 L3.18937178,4.80468826 L7.99406007,0 L9.05960657,1.06554661 L3.18937182,6.75830078 Z" ></path></svg>
        </div>
        <div className="list-item__star" onClick={this._onToggleFaved}>
          <svg viewBox="0 0 14 13"><polygon points="7 10.5 2.88550323 12.663119 3.67130219 8.08155948 0.342604386 4.83688104 4.94275162 4.16844052 7 0 9.05724838 4.16844052 13.6573956 4.83688104 10.3286978 8.08155948 11.1144968 12.663119 "></polygon></svg>
        </div>
        <div className="list-item__sender">{letter.sender}</div>
        <div className="list-item__text">
          <span className="list-item__subject">  {letter.subject}</span>
          <span className="list-item__snippet">{letter.snippet}</span>
        </div>

        <div className="list-item__date">{letter.date}</div>
      </div>
    )
  },

  _onToggleChecked: function() {
    letterActions.toggleChecked(this.props.letter);
  },

  _onToggleFaved: function() {
    letterActions.toggleFaved(this.props.letter);
  },
});

module.exports = ListItem;
