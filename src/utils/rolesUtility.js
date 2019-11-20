import _ from "lodash";

const ADMIN = "ADMIN";
const MANAGER = "MANAGER";
//const REGULAR_USER = "REGULAR_USER";

export const isAdmin = roles => {
  return _.includes(roles, ADMIN);
};

export const isManager = roles => {
  return _.includes(roles, MANAGER);
};

export const isManagerOrAdmin = roles => {
  return isManager(roles) || isAdmin(roles);
};
