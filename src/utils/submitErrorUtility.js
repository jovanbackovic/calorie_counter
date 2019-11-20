import { SubmissionError } from "redux-form";

export const wrongLoginCredentials = error => {
  if (
    error.response &&
    error.response.data &&
    error.response.data.username &&
    error.response.data.password
  ) {
    throw new SubmissionError({
      username: "Wrong Username or Password",
      password: true
    });
  } else {
    console.log(error.response);
  }
};

export const usernameAlreadyExist = error => {
  if (error.response && error.response.data && error.response.data.username) {
    throw new SubmissionError({
      username: error.response.data.username
    });
  } else {
    console.log(error.response);
  }
};
