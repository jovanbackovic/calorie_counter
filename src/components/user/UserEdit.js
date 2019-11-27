import React, { Component } from "react";
import { connect } from "react-redux";

import UserForm from "./UserForm";
import Loader from "../layout/Loader";

import { fetchUser, editUser } from "../../actions/user";

class UserEdit extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  onSubmit = async formValues => {
    try {
      await this.props.editUser(this.props.match.params.id, formValues);
    } catch (error) {
      throw error;
    }
  };

  renderForm = () => {
    return (
      <UserForm
        title="Edit User Account"
        initialValues={this.props.user}
        roles={this.props.auth.roles}
        onSubmit={this.onSubmit}
        buttonText="Edit User"
        edit={true}
      />
    );
  };

  render() {
    if (!this.props.user) {
      return <Loader />;
    }
    return this.renderForm();
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    user: state.user.users[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchUser, editUser })(UserEdit);
