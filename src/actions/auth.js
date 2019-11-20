import jwt_decode from "jwt-decode";

import api from "../api";
import history from "../history";
import { LOG_OUT, SET_CURRENT_USER } from "./types";
import { setLocalAuth, removeLocalAuth } from "../utils/authUtility";
import {
  usernameAlreadyExist,
  wrongLoginCredentials
} from "../utils/submitErrorUtility";

export const logInPayload = (user, roles) => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      user,
      roles
    }
  };
};

export const logIn = logInData => async dispatch => {
  try {
    const res = await api.post("/api/login", logInData);
    const { token, roles } = res.data;
    const user = jwt_decode(token);
    setLocalAuth(token, roles);
    dispatch(logInPayload(user, roles));
    history.push("/");
  } catch (error) {
    wrongLoginCredentials(error);
  }
};

export const logOut = dispatch => {
  removeLocalAuth();
  history.push("/");
  dispatch({
    type: LOG_OUT
  });
};

export const register = async user => {
  try {
    await api.post("/api/register", user);
    history.push("/");
  } catch (error) {
    usernameAlreadyExist(error);
  }
};
