import jwt_decode from "jwt-decode";

import api from "../api";
import { logOut, logInPayload } from "../actions/auth";

export const removeLocalAuth = () => {
  setLocalAuth(null);
};

export const setLocalAuth = (token, roles) => {
  if (token) {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("roles", roles);
    api.defaults.headers.common["Authorization"] = token;
  } else {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");
    delete api.defaults.headers.common["Authorization"];
  }
};

export const sessionExists = dispatch => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const decodedToken = jwt_decode(token);
    if (tokenExpired(decodedToken)) {
      dispatch(logOut());
      return false;
    }
    const roles = localStorage.getItem("roles").split(",");
    setLocalAuth(token, roles);
    dispatch(logInPayload(decodedToken, roles));
  }
  return true;
};

const tokenExpired = decodedToken => {
  const currentTime = new Date() / 1000;
  return decodedToken.exp < currentTime;
};
