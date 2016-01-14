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
        </div>
      </div>
    )
  }
});

module.exports = Sidebar;
