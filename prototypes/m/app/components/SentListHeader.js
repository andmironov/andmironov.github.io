let React = require("react");
let classNames = require("classnames");

let SentListHeader = React.createClass({

  getInitialState: function() {
    return {
        isCheckboxNavOpened : false
    }
  },

  toggleCheckboxNav: function() {
    this.setState({
      isCheckboxNavOpened: this.state.isCheckboxNavOpened ? false : true,
    });
  },

  render: function() {
    let checkboxNavClassnames = classNames({
      'checkbox__nav': true,
      'checkbox__nav_opened': this.state.isCheckboxNavOpened,
    });

    return (
      <div className="list__header">
        <div className="checkbox">
          <div className="checkbox__hole"></div>
          <div className="checkbox__bird" onClick={this.toggleCheckboxNav}></div>
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
  }
});

module.exports = SentListHeader;
