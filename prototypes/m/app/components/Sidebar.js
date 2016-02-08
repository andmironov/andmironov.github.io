import React from "react"
import { Link } from "react-router"
import classNames from "classnames"


let Sidebar = React.createClass({

  getInitialState: function() {
    return {
      isSidebarNavExpanded:false
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
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_star"><svg viewBox="-4 0 20 22"><g><path d="M2,14 L10,14 L10,6 L2,6 L2,14 Z M0,4 L12,4 L12,16 L0,16 L0,4 L0,4 L0,4 Z" ></path><path d="M4,1 L4,0 L8,0 L8,1 L12,1 L12,3 L0,3 L0,1 L4,1 Z" ></path></g></svg></span>
                <span className="sidebar-nav__item-title">Корзина</span>
                <span className="sidebar-nav__item-cleanUpLink">Очистить</span>
              </Link>
            </li>

            <li className="sidebar-nav__item sidebar-nav__item-secondary">
              <Link to="mail/folder/sent">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_star"><svg viewBox="-2 0 20 22"><g><path d="M8,14 L8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 L8,14 Z M8,16 L8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 L8,16 Z" ></path><path d="M1.86838715,3.93930621 L13.1232051,13.3510708 L14.4062067,11.8168261 L3.1513888,2.40506152 L1.86838715,3.93930621 L1.86838715,3.93930621 Z"></path></g></svg></span>
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
