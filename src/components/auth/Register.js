import React, { Component } from "react";

import { register } from "../../actions/auth";
import UserForm from "../user/UserForm";

class Register extends Component {
  onSubmit = async userData => {
    try {
      await register(userData);
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <div className="ui centered grid">
        <div className="row">
          <h3>Registration Form</h3>
        </div>
        <UserForm
          buttonText="Register"
          edit={false}
          roles={[]}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default Register;
