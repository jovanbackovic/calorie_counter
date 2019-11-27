import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import store from "../../store";
import history from "../../history";

import { isManagerOrAdmin } from "../../utils/rolesUtility";
import { sessionExists } from "../../utils/authUtility";

class Landing extends Component {
  componentDidMount() {
    if (!sessionExists(store.dispatch)) history.push("/session_expired");
    if (this.props.auth && isManagerOrAdmin(this.props.auth.roles)) {
      history.push("/user_list");
    }
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid ">
        <div style={{ marginTop: "200px" }} className="column">
          <h1 className="header">
            Create your account and start eating healthy today!
          </h1>
          <div>
            <Link to="/log_in" className="ui huge primary button">
              Log In
            </Link>
            <Link to="/register" className="ui huge button">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Landing);
