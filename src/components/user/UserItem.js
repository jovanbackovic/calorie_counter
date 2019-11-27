import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { isAdmin } from "../../utils/rolesUtility";

class UserItem extends Component {
  renderButtons = user => {
    if (user.admin) {
      if (!isAdmin(this.props.auth.roles)) {
        return null;
      }
    }
    return (
      <div className="right floated ">
        <Link to={`/user_edit/${user.id}`} className="ui button primary">
          Edit
        </Link>
        <Link to={`/user_delete/${user.id}`} className="ui button negative">
          Delete
        </Link>
      </div>
    );
  };

  render() {
    const { user } = this.props;

    return (
      <div className="item">
        <div className="content">
          <p className="header">{user.username}</p>
          <div className="description">
            <p>
              Full name : {user.firstName} {user.lastName}
            </p>
            <div className="ui label">
              Calories per day : {user.caloriesPerDay}
            </div>
            {this.renderButtons(user)}
          </div>
          <div className="extra"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserItem);
