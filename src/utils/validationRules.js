export const validateUsername = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.length < 6) {
    errors.username = "Username must be longer then 6 characters";
  } else if (values.username.length > 30) {
    errors.username = "Username must be smaller then 30 characters";
  }
  return errors;
};

export const validatePassword = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be longer then 6 characters";
  } else if (values.password.length > 30) {
    errors.password = "Password must be smaller then 30 characters";
  }
  return errors;
};

export const validatePasswordAndConfirmedPassword = values => {
  const errors = validatePassword(values);
  if (!errors.password) {
    if (
      !values.confirmedPassword ||
      values.confirmedPassword !== values.password
    ) {
      errors.confirmedPassword = "Passwords must match";
    }
  }
  return errors;
};

export const validateCaloriesPerDay = values => {
  const errors = {};
  if (values.caloriesPerDay && values.caloriesPerDay < 0) {
    errors.caloriesPerDay = "Calories Per Day must be a positive number";
  }
  return errors;
};

export const validateUserRoles = values => {
  const errors = {};
  if (!values.regularUser && !values.manager && !values.admin) {
    errors.roles = "User must at least have one role";
  }
  return errors;
};
