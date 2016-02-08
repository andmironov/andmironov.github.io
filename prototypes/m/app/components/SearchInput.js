import React from "react"
import classNames from "classnames"

let ReactPropTypes = React.PropTypes

let SearchInput = React.createClass({

  propTypes: {
    areAllChecked: ReactPropTypes.bool,
    folderName: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      isSearchExpanded:false,
      isSearchDropdownExpanded:false
    }
  },

  componentWillReceiveProps: function() {
    this.setState({isSearchDropdownExpanded:false})
  },

  render: function() {

    let searchClassnames = classNames({
      'search': true,
      'search_expanded': this.state.isSearchExpanded,
    });

    let searchDropdownClassnames = classNames({
      'search__dropdown': true,
      'search__dropdown_expanded': this.state.isSearchDropdownExpanded,
    });

    return (
      <div className="search-wrap">
        <div className="search-icon" onClick={this._toggleSearchExpanded}></div>
          <div className={searchClassnames}>
          <div className="search__field"><input type="text" placeholder="Поиск по входящим"/></div>
          <div className={searchDropdownClassnames}>

            <div className="search__dropdown-selected" onClick={this._toggleSearchDropdown}>
              <div className="search__dropdown-selected-text">По письмам</div>
              <div className="search__dropdown-bird"></div>
            </div>

            <ul className="search__dropdown-nav">
              <li className="search__dropdown-nav-item search__dropdown-nav-item_selected"><a href="#" onClick="">По письмам</a></li>
              <li className="search__dropdown-nav-item"><a href="#" onClick="">Отправитель</a></li>
              <li className="search__dropdown-nav-item"><a href="#" onClick="">Получатель</a></li>
              <li className="search__dropdown-nav-item"><a href="#" onClick="">Тема</a></li>
            </ul>
          </div>
          <div className="search__button"></div>
          </div>
      </div>
    )
  },

  _toggleSearchExpanded: function(e) {
    e.preventDefault();
    this.setState({
      isSearchExpanded: !this.state.isSearchExpanded,
    });
  },

  _toggleSearchDropdown: function(e) {
    e.preventDefault();
    this.setState({
      isSearchDropdownExpanded: !this.state.isSearchDropdownExpanded,
    });
  },
});

module.exports = SearchInput;
