import React from "react"
import classNames from "classnames"
import SidebarItem from "./SidebarItem"

let SidebarNav = React.createClass({

  getInitialState: function() {
    return {
      isSidebarNavExpanded:false,
      folders : [
        {
          name: "inbox",
          title: "Входящие",
          link: "mail/folder/inbox",
          icon: <svg width='20px' height='20px'><g><rect opacity='0' x='0' y='0' width='20' height='20'></rect><path d='M17.5148266,6 L17.5148266,15 L3.51482657,15 L3.51482657,6 L17.5148266,6 L17.5148266,6 L17.5148266,6 Z M1.51482657,4 L1.51482657,17 L19.5148266,17 L19.5148266,4 L1.51482657,4 L1.51482657,4 L1.51482657,4 Z'></path><path d='M10.5812382,12.0426371 L18.1624764,6.62746694 L17,5 L10.5812383,9.82294989 L4.16247638,5 L3,6.62746694 L10.5812382,12.0426371 L10.5812382,12.0426371 Z'></path></g></svg>
        },
        {
          name: "sent",
          title: "Отправленные",
          link: "mail/folder/sent",
          icon: <svg width='20px' height='20px'><g><rect opacity='0' x='0' y='0' width='20' height='20'></rect><path d='M5.29786205,10.3970432 L1.00000004,18.7940873 L19.8218902,10.3970437 L1,2 L5.29786205,10.3970432 L5.29786205,10.3970432 Z M5.39660301,6.17138112 L14.9787017,10.3970434 L5.2841331,14.8213607 L7.55981863,10.3970436 L5.39660301,6.17138112 L5.39660301,6.17138112 Z'></path></g></svg>
        },
        {
          name: "starred",
          title: "Отмеченные",
          link: "mail/filter/starred",
          icon: <svg width='20px' height='19px'><g><rect opacity='0' x='0' y='0' width='20' height='20'></rect><path d='M15.7878263,18.559703 L14.6145296,11.8647147 L19.5148266,7.0891757 L12.7741976,6.25472975 L9.75741327,0 L6.79665899,6.25472975 L0,7.0891757 L4.91341924,11.8647147 L3.72700023,18.559703 L9.75741291,15.2746878 L15.7878263,18.559703 L15.7878263,18.559703 Z M7.02766778,11.1464996 L4.23867551,8.48678514 L8.07033777,7.93749125 L9.75741347,4.50802561 L11.4444888,7.93749125 L15.2187172,8.48678514 L12.4871588,11.1464996 L13.1349769,14.9450982 L9.75741327,13.1297758 L6.31142954,14.9450982 L7.02766778,11.1464996 Z'></path></g></svg>
        },
        {
          name: "drafts",
          title: "Черновики",
          link: "mail/folder/drafts",
          icon: <svg width='20px' height='20px'><g><rect opacity='0' x='0' y='0' width='20' height='20'></rect><path d='M15,15.99823 L15,9 L10,4 L5,4 L5,15.99823 L15,15.99823 Z M17,17.99823 L3,17.99823 L3,2 L11,2 L17,8 L17,17.99823 L17,17.99823 Z'></path><path d='M9,4 L9.02867737,9.97136608 L15,10 L15,8 L11,8 L11,4 L9,4 Z'></path></g></svg>
        },
        {
          name: "bin",
          title: "Корзина",
          link: "mail/folder/bin",
          icon: <svg width='20px' height='20px'><g><rect opacity='0' x='0' y='0' width='20' height='20'></rect><path d='M6,16 L14,16 L14,8 L6,8 L6,16 Z M4,6 L16,6 L16,18 L4,18 L4,6 L4,6 L4,6 Z'></path><path d='M8,3 L8,2 L12,2 L12,3 L16,3 L16,5 L4,5 L4,3 L8,3 Z'></path></g></svg>
        },
        {
          name: "spam",
          title: "Спам",
          link: "mail/folder/spam",
          icon: <svg width='20px' height='20px'><g><rect opacity='0' x='0' y='0' width='20' height='20'></rect><path d='M10,16 L10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 L10,16 Z M10,18 L10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,14.418278 14.418278,18 10,18 L10,18 Z'></path><path d='M3.86838715,5.93930621 L15.1232051,15.3510708 L16.4062067,13.8168261 L5.1513888,4.40506152 L3.86838715,5.93930621 L3.86838715,5.93930621 Z'></path></g></svg>
        }
      ]
    }
  },

  render: function() {
    let currentFolderName = this.props.params.folderName


    let folders = this.state.folders.map((folder, i) => {
      let IsNavItemHidden = (i > 2) ? true : false
      return <SidebarItem key={i} isCurrent={folder.name == currentFolderName} link={folder.link} title={folder.title} counter={this.props.newLettersCount[folder.name]} icon={folder.icon} isHidden={IsNavItemHidden}/>
    })

    let sidebarNavClassnames = classNames({
      'sidebar-nav': true,
      'sidebar-nav_expanded': this.state.isSidebarNavExpanded
    })

    let sidebarNavMoreLinkText = this.state.isSidebarNavExpanded ? "Скрыть" : "Eщe"

    return (
      <ul className={sidebarNavClassnames}>
        {folders}
        <li className="sidebar-nav__item sidebar-nav__item_more">
          <a href="/" onClick={this._toggleSidebarNavExpanded}>
            <span className="sidebar-nav__item-icon"></span>
            <span className="sidebar-nav__item-title">{sidebarNavMoreLinkText}</span>
          </a>
        </li>
      </ul>
    )
  },

  _toggleSidebarNavExpanded: function(e) {
    e.preventDefault();
    this.setState({
      isSidebarNavExpanded: !this.state.isSidebarNavExpanded,
    });
  },
})

module.exports = SidebarNav
