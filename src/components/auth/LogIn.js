import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { logIn } from "../../actions/auth";
import {
  validateUsername,
  validatePassword
} from "../../utils/validationRules";

class LogIn extends Component {
  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input type={type} {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError({ error, touched }) {
    if (error && touched) {
      return <div className="ui error message">{error}</div>;
    }
    return null;
  }

  onSubmit = async logInData => {
    try {
      await this.props.logIn(logInData);
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <div className="ui two column center aligned grid">
        <div className="column">
          <div style={{ marginTop: "60px" }} className="ui segment">
            <h3>Log In</h3>
            <br />
            <div className="ui left aligned grid">
              <div className="left floated column">
                <form
                  className="ui form error"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="username"
                    label="Username"
                    type="text"
                    component={this.renderInput}
                  />

                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    component={this.renderInput}
                  />
                  <div className="ui centered grid">
                    <div className="centered row">
                      <button className="ui primary button large">
                        Log In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = values => {
  var errors = {};
  errors = { ...errors, ...validateUsername(values) };
  errors = { ...errors, ...validatePassword(values) };
  return errors;
};

const logInForm = reduxForm({
  form: "logInForm",
  validate
})(LogIn);

export default connect(null, { logIn })(logInForm);
