import React from 'react'
import classNames from "classnames"


let User = React.createClass({

  getInitialState: function() {
    return {
      isUserNavExpanded:false,
    }
  },

  render: function() {
    let userClassnames = classNames({
      'user': true,
      'user_more-expanded': this.state.isUserNavExpanded
    });

    return (
      <div className={userClassnames} onClick={this._toggleUserNavExpanded}>
        <div className="user__first-name">Константин</div>
        <div className="user__avatar"></div>
        <div className="user__more">

          <div className="user__more-info">
            <div className="user__more-full-name">Константин Петров</div>
            <ul className="user__more-nav">
              <li><a href="/">Учетная запись</a></li>
              <li><a href="/">Выйти</a></li>
            </ul>
          </div>

          <div className="user__more-big-avatar"></div>
          
        </div>
      </div>
    )
  },

  _toggleUserNavExpanded: function(e) {
    e.preventDefault();
    this.setState({
      isUserNavExpanded: !this.state.isUserNavExpanded,
    });
  },
});

module.exports = User;
