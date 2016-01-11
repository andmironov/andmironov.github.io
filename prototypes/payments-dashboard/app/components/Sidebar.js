let React = require("react");
let sidebarStyles = require("../scss/sidebar.scss");


let Sidebar = React.createClass({

  render: function() {

    let avatarStyle = {
        backgroundImage: "url(" + this.props.user.image + ")"
    }

    return (
      <div className="block-sidebar">
        <div className="block-sidebar__inner">
          <div className="block-sidebar-user-profile">
            <div className="block-sidebar-user-profile__avatar" style={avatarStyle}></div>
            <div className="block-sidebar-user-profile__name">
              {this.props.user.fullName}
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Sidebar;
