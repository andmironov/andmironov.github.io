import React from "react"
import classNames from "classnames"
let ReactPropTypes = React.PropTypes

let searchTypes = [
  "Письма",
  "Отправитель",
  "Получатель",
  "Тема"
]

let Search = React.createClass({

  propTypes: {
    areAllChecked: ReactPropTypes.bool,
    folderName: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      currentSearchType: searchTypes[0],
      isSearchExpanded: false,
      isSearchDropdownExpanded: false
    }
  },

  componentWillReceiveProps: function() {
    this.setState({
      isSearchDropdownExpanded: false,
      isSearchExpanded: false
    })
  },

  render: function() {

    let searchClassnames = classNames({
      'search': true,
      'search_expanded': this.state.isSearchExpanded,
      'search_dropdown-expanded': this.state.isSearchDropdownExpanded,
    })

    let searchDropdownClassnames = classNames({
      'search__dropdown': true,

    })

    let searchTypesList = searchTypes.map((item, i) => {
      let searchTypeClassnames = classNames({
        'search__dropdown-nav-item': true,
        'search__dropdown-nav-item-current': item == this.state.currentSearchType
      })
      return <li className={searchTypeClassnames} key={i} ><a href="/" onClick={this._changeSearchType.bind(this, item)}>{item}</a></li>
    })

    return (
      <div className="search-wrap">
        <div className="search-icon" onClick={this._toggleSearchExpanded}>
          <svg><path d="M4.99627821,12.9179354 L1.98959236,15.9246212 L0.575378798,14.5104076 L3.58206465,11.5037218 C1.52229504,8.76606301 1.71624926,4.88425581 4.17957465,2.42093041 C6.88006387,-0.279558803 11.2853203,-0.252660426 14.0189904,2.48100962 C16.7526604,5.21467966 16.7795588,9.61993613 14.0790696,12.3204253 C11.6157442,14.7837507 7.73393699,14.977705 4.99627821,12.9179354 Z M12.664856,10.9062118 L12.664856,10.9062118 L12.664856,10.9062118 C14.5804046,8.99066319 14.5612381,5.85168446 12.6047768,3.89522318 C10.6483155,1.9387619 7.50933681,1.91959538 5.59378822,3.83514397 C3.86359446,5.56533773 3.69498626,8.32722833 5.18023427,10.3012851 L6.22470832,11.6895052 L4.99627821,12.9179354 L1.98959236,15.9246212 L0.575378798,14.5104076 L3.58206465,11.5037218 L4.81049476,10.2752917 L6.19871485,11.3197657 C8.17277167,12.8050137 10.9346623,12.6364055 12.664856,10.9062118 L12.664856,10.9062118 Z"></path></svg>
        </div>

        <div className={searchClassnames}>
          <div className="search__field"><input type="text" placeholder="Поиск по входящим"/></div>
          <div className="search__dropdown">
            <div className="search__dropdown-selected" onClick={this._toggleSearchDropdown}>
              <div className="search__dropdown-selected-text">{this.state.currentSearchType}</div>
              <div className="search__dropdown-bird"><svg><path d="M6,4.82842712 L1.75735931,0.585786438 L0.343145751,2 L5.29289322,6.94974747 L6,7.65685425 L11.6568542,2 L10.2426407,0.585786438 L6,4.82842712 L6,4.82842712 L6,4.82842712 Z"></path></svg></div>
            </div>
            <ul className="search__dropdown-nav">{searchTypesList}</ul>
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

  _changeSearchType: function(item, e) {
    e.preventDefault();
    this.setState({
      currentSearchType: item,
      isSearchDropdownExpanded: false
    });
  },
});

module.exports = Search;
