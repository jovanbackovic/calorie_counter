import React, { Component } from "react";
import { connect } from "react-redux";

import { createUser } from "../../actions/user";
import UserForm from "./UserForm";

class UserEdit extends Component {
  onSubmit = async formValues => {
    try {
      await this.props.createUser(formValues);
    } catch (error) {
      throw error;
    }
  };

  renderForm = () => {
    return (
      <UserForm
        title="Create User Account"
        roles={this.props.auth.roles}
        onSubmit={this.onSubmit}
        buttonText="Create User"
        edit={false}
      />
    );
  };

  render() {
    return this.renderForm();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { createUser })(UserEdit);
