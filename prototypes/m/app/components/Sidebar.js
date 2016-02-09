import React from "react"
import { Link } from "react-router"
import classNames from "classnames"
import LetterStore from "../stores/LetterStore"

let Sidebar = React.createClass({

  getInitialState: function() {
    return {
      isSidebarNavExpanded:false,
      inboxNewCount: LetterStore.countNewInFolder("inbox"),
    }
  },

  render: function() {

    let sidebarNavClassnames = classNames({
      'sidebar-nav': true,
      'sidebar-nav_expanded': this.state.isSidebarNavExpanded
    });

    let sidebarNavMoreLinkText = this.state.isSidebarNavExpanded ? "Скрыть" : "Eщe";


    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <div className="send-button">Написать письмо</div>
          <ul className={sidebarNavClassnames}>
            <li className="sidebar-nav__item sidebar-nav__item_current">
              <Link to="mail/folder/inbox">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_inbox"><svg viewBox="0 0 20 18"><g><path d="M16,2 L16,11 L2,11 L2,2 L16,2 L16,2 Z M0,0 L0,13 L18,13 L18,0 L0,0 L0,0 Z"></path><path d="M9,8.22890361 L16.5812382,2.81373347 L15.4187618,1.18626653 L9.00000008,6.00921642 L2.58123819,1.18626653 L1.41876181,2.81373347 L9,8.22890361 Z"></path></g></svg></span>
                <span className="sidebar-nav__item-title">Входящие</span>
                <span className="sidebar-nav__item-counter">{this.state.inboxNewCount}</span>
              </Link>
            </li>

            <li className="sidebar-nav__item">
              <Link to="mail/folder/sent">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_sent"><svg viewBox="0 0 20 23"><path d="M5.11041254,9.32614853 L0.812550531,17.7231926 L19.6344407,9.32614898 L0.812550488,0.929105306 L5.11041254,9.32614853 Z M5.2091535,5.10048643 L14.7912522,9.32614866 L5.09668359,13.750466 L7.37236912,9.3261489 L5.2091535,5.10048643 Z"></path></svg></span>
                <span className="sidebar-nav__item-title">Отправленные</span>
              </Link>
            </li>

            <li className="sidebar-nav__item">
              <Link to="list/starred">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_star"><svg viewBox="0 0 20 25"><path d="M15.7878263,18.559703 L14.6145296,11.8647147 L19.5148266,7.0891757 L12.7741976,6.25472975 L9.75741327,0 L6.79665899,6.25472975 L0,7.0891757 L4.91341924,11.8647147 L3.72700023,18.559703 L9.75741291,15.2746878 L15.7878263,18.559703 L15.7878263,18.559703 Z M7.02766778,11.1464996 L4.23867551,8.48678514 L8.07033777,7.93749125 L9.75741347,4.50802561 L11.4444888,7.93749125 L15.2187172,8.48678514 L12.4871588,11.1464996 L13.1349769,14.9450982 L9.75741327,13.1297758 L6.31142954,14.9450982 L7.02766778,11.1464996 Z"></path></svg></span>
                <span className="sidebar-nav__item-title">Помеченные</span>
              </Link>
            </li>

            <li className="sidebar-nav__item sidebar-nav__item-secondary">
              <Link to="mail/folder/sent">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_star"><svg viewBox="-4 0 20 22"><g><path d="M12,13.99823 L12,7 L7,2 L2,2 L2,13.99823 L12,13.99823 Z M14,15.99823 L0,15.99823 L0,0 L8,0 L14,6 L14,15.99823 L14,15.99823 Z"></path><path d="M6,2 L6.02867737,7.97136608 L12,8 L12,6 L8,6 L8,2 L6,2 Z"></path></g></svg></span>
                <span className="sidebar-nav__item-title">Черновики</span>
              </Link>
            </li>

            <li className="sidebar-nav__item sidebar-nav__item-secondary">
              <Link to="mail/folder/sent">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_star"><svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M6,16 L14,16 L14,8 L6,8 L6,16 Z M4,6 L16,6 L16,18 L4,18 L4,6 L4,6 L4,6 Z"></path><path d="M8,3 L8,2 L12,2 L12,3 L16,3 L16,5 L4,5 L4,3 L8,3 Z"></path></g></svg></span>
                <span className="sidebar-nav__item-title">Корзина</span>
                <span className="sidebar-nav__item-cleanUpLink">Очистить</span>
              </Link>
            </li>

            <li className="sidebar-nav__item sidebar-nav__item-secondary">
              <Link to="mail/folder/sent">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_star"><svg><g><rect opacity="0" x="0" y="0" width="20" height="20"></rect><path d="M10,16 L10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 L10,16 Z M10,18 L10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,14.418278 14.418278,18 10,18 L10,18 Z"></path><path d="M3.86838715,5.93930621 L15.1232051,15.3510708 L16.4062067,13.8168261 L5.1513888,4.40506152 L3.86838715,5.93930621 L3.86838715,5.93930621 Z"></path></g></svg></span>
                <span className="sidebar-nav__item-title">Спам</span>
                <span className="sidebar-nav__item-cleanUpLink">Очистить</span>
              </Link>
            </li>

            <li className="sidebar-nav__item sidebar-nav__item_more">
              <a href="/" onClick={this._toggleSidebarNavExpanded}>
                <span className="sidebar-nav__item-icon"></span>
                <span className="sidebar-nav__item-title">{sidebarNavMoreLinkText}</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="sidebar__ad">
          <div className="sidebar__ad__banner"></div>
        </div>
      </div>
    )
  },

  _toggleSidebarNavExpanded: function(e) {
    e.preventDefault();
    this.setState({
      isSidebarNavExpanded: !this.state.isSidebarNavExpanded,
    });
  },
});

module.exports = Sidebar;
