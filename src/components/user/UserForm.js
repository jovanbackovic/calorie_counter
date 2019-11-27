import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Checkbox } from "semantic-ui-react";
import _ from "lodash";

import { isAdmin, isManagerOrAdmin } from "../../utils/rolesUtility";
import {
  validateFirstName,
  validateLastName,
  validatePasswordAndConfirmedPassword,
  validateCaloriesPerDay,
  validateUserRoles,
  validateUsername
} from "../../utils/validationRules";

class UserForm extends Component {
  renderInput = ({ input, label, meta, type, edit = false }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input type={type} {...input} autoComplete="off" disabled={edit} />
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

  renderRoles = roles => {
    const adminCheckbox = isAdmin(roles) ? (
      <Field name="admin" label="Admin" component={this.renderCheckboxField} />
    ) : null;

    if (isManagerOrAdmin(roles)) {
      return (
        <div className="field">
          <label>Roles</label>
          <div className="inline fields">
            <Field
              name="regularUser"
              label="Regular User"
              component={this.renderCheckboxField}
            />
            <Field
              name="manager"
              label="Manager"
              component={this.renderCheckboxField}
            />
            {adminCheckbox}
          </div>
          <Field
            name="roles"
            component={({ meta }) => <div>{this.renderError(meta)}</div>}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  renderCheckboxField = ({ input, label }) => {
    if (this.props.edit && input.value === "") return null;
    const checked = this.props.edit && input.value;
    input = _.omit(input, "value");
    return (
      <div className="field">
        <Checkbox label={label} {...input} defaultChecked={checked} />
      </div>
    );
  };

  render() {
    const { roles, edit, buttonText, title } = this.props;
    return (
      <div className="ui two column center aligned grid">
        <div className="column">
          <div style={{ marginTop: "60px" }} className="ui segment">
            <h3>{title}</h3>
            <br />
            <div className="ui left aligned grid">
              <div className="left floated column">
                <form
                  className="ui form error"
                  onSubmit={this.props.handleSubmit(this.props.onSubmit)}
                >
                  <Field
                    name="username"
                    label="Username"
                    type="text"
                    component={this.renderInput}
                    edit={edit}
                  />

                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    component={this.renderInput}
                  />
                  <Field
                    name="confirmedPassword"
                    label="Confirm Password"
                    type="password"
                    component={this.renderInput}
                  />
                  <Field
                    name="firstName"
                    label="First Name"
                    type="text"
                    component={this.renderInput}
                  />
                  <Field
                    name="lastName"
                    label="Last Name"
                    type="text"
                    component={this.renderInput}
                  />
                  <Field
                    name="caloriesPerDay"
                    label="Calories Per Day"
                    type="number"
                    component={this.renderInput}
                  />
                  {this.renderRoles(roles)}
                  <div className="ui centered grid">
                    <div className="centered row">
                      <button className="ui primary button large">
                        {buttonText}
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

const validate = (values, props) => {
  const { roles, edit } = props;
  var errors = {};
  if (isManagerOrAdmin(roles)) {
    errors = { ...errors, ...validateUserRoles(values) };
  }
  if (!edit) {
    errors = { ...errors, ...validateUsername(values) };
  }
  if (!edit || values.password) {
    errors = { ...errors, ...validatePasswordAndConfirmedPassword(values) };
  }
  errors = { ...errors, ...validateCaloriesPerDay(values) };
  errors = { ...errors, ...validateFirstName(values) };
  errors = { ...errors, ...validateLastName(values) };
  return errors;
};

export default reduxForm({
  form: "userForm",
  validate,
  enableReinitialize: false
})(UserForm);
