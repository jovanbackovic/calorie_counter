import React, { Component } from "react";
import { connect } from "react-redux";

import history from "../../history";
import Modal from "../layout/Modal";
import Loader from "../layout/Loader";
import { fetchUser, deleteUser } from "../../actions/user";

class SessionExpired extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  dissmiss = () => {
    history.push("/");
  };

  deleteUserById = () => {
    this.props.deleteUser(this.props.user.id);
    history.push("/");
  };

  renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={this.deleteUserById} className="ui negative button">
          Delete
        </button>
        <button onClick={this.dissmiss} className="ui button">
          Cancel
        </button>
      </React.Fragment>
    );
  };

  render() {
    if (!this.props.user) {
      return <Loader />;
    }
    return (
      <Modal
        title="Delete user"
        content={`Are you sure that you want to delete user '${this.props.user.username}'?`}
        onDismiss={this.dissmiss}
        actions={this.renderActions()}
      />
    );
  }
}

const mapStateToProps = ({ user }, ownProps) => {
  return { user: user.users[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchUser, deleteUser })(
  SessionExpired
);
