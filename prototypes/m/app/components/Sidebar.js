let React = require("react");

let Sidebar = React.createClass({

  render: function() {
    let avatarStyle = {
        backgroundImage: ""
    }

    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <div className="send-button">Написать письмо</div>
          <ul className="sidebar-nav">
            <li className="sidebar-nav__item sidebar-nav__item_current">
              <a href="/">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_inbox"><svg viewBox="0 0 20 18"><g><path d="M16,2 L16,11 L2,11 L2,2 L16,2 L16,2 Z M0,0 L0,13 L18,13 L18,0 L0,0 L0,0 Z"></path><path d="M9,8.22890361 L16.5812382,2.81373347 L15.4187618,1.18626653 L9.00000008,6.00921642 L2.58123819,1.18626653 L1.41876181,2.81373347 L9,8.22890361 Z"></path></g></svg></span>
                <span className="sidebar-nav__item-title">Входящие</span>
              </a>
            </li>

            <li className="sidebar-nav__item">
              <a href="/">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_sent"><svg viewBox="0 0 20 25"><path d="M6.55401627,15.6855467 L7.27025451,11.8869481 L4.48126224,9.22723368 L8.3129245,8.67793979 L10.0000002,5.24847415 L11.6870755,8.67793979 L15.4613039,9.22723368 L12.7297455,11.8869481 L13.3775636,15.6855467 L10,13.8702243 L6.55401627,15.6855467 Z M16.030413,19.3001515 L14.8571163,12.6051632 L19.7574133,7.82962424 L13.0167843,6.99517829 L10,0.740448538 L7.03924572,6.99517829 L0.242586728,7.82962424 L5.15600597,12.6051632 L3.96958696,19.3001515 L9.99999964,16.0151363 L16.030413,19.3001515 Z"></path></svg></span>
                <span className="sidebar-nav__item-title">Отправленные</span>
              </a>
            </li>

            <li className="sidebar-nav__item">
              <a href="/">
                <span className="sidebar-nav__item-icon sidebar-nav__item-icon_star"><svg viewBox="0 0 20 23"><path d="M5.11041254,9.32614853 L0.812550531,17.7231926 L19.6344407,9.32614898 L0.812550488,0.929105306 L5.11041254,9.32614853 Z M5.2091535,5.10048643 L14.7912522,9.32614866 L5.09668359,13.750466 L7.37236912,9.3261489 L5.2091535,5.10048643 Z"></path></svg></span>
                <span className="sidebar-nav__item-title">Помеченные</span>
              </a>
            </li>

            <li className="sidebar-nav__item sidebar-nav__item_more">
              <a href="/">
                <span className="sidebar-nav__item-icon"></span>
                <span className="sidebar-nav__item-title">Еще</span>
              </a>
            </li>

          </ul>
        </div>
        <div className="sidebar__ad">
          <div className="sidebar__ad__banner"></div>
        </div>
      </div>
    )
  }
});

module.exports = Sidebar;
