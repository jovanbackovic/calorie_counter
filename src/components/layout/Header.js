import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logOut } from "../../actions/auth";

class Header extends Component {
  renderLinks = () => {
    return null;
  };

  renderAuthentication = () => {
    const { loggedUser } = this.props.auth;
    if (loggedUser) {
      return (
        <React.Fragment>
          <Link to={`/user_edit/${loggedUser.id}`} className="ui item">
            {loggedUser.username}
          </Link>
          <Link to="/" className="ui item" onClick={() => this.props.logOut()}>
            Log Out
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/register" className="ui item">
            Register
          </Link>
          <Link to="/log_in" className="ui item">
            Log In
          </Link>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="ui huge blue inverted pointing menu">
        <div className="header item">
          <Link to="/">Calorie Counter</Link>
        </div>
        <div className="right menu">{this.renderAuthentication()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { logOut })(Header);
