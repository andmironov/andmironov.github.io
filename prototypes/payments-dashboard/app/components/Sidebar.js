let React = require("react");

let Sidebar = React.createClass({

  render: function() {

    let avatarStyle = {
        backgroundImage: "url(" + this.props.user.image + ")"
    }

    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar-user-profile">
            <div className="sidebar-user-profile__avatar" style={avatarStyle}></div>
            <div className="sidebar-user-profile__name">
              {this.props.user.fullName}
            </div>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-nav__item sidebar-nav__item_current"><a href="/">Overview</a></li>
            <li className="sidebar-nav__item"><a href="/">Income</a></li>
            <li className="sidebar-nav__item"><a href="/">Payments</a></li>
            <li className="sidebar-nav__item"><a href="/">Clients</a></li>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Sidebar;
