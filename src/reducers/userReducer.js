import _ from "lodash";

import {
  FETCH_USER,
  FETCH_USERS,
  DELETE_USER,
  EDIT_USER,
  CREATE_USER
} from "../actions/types";

const initialState = {
  users: {},
  hasMoreUsers: true,
  page: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
    case CREATE_USER:
    case EDIT_USER:
      return { users: { ...state.users, [action.payload.id]: action.payload } };
    case FETCH_USERS:
      const { page } = action.payload;
      let users;
      if (page !== 0) {
        users = { ...state.users, ..._.mapKeys(action.payload.users, "id") };
      } else {
        users = { ..._.mapKeys(action.payload.users, "id") };
      }
      return {
        users,
        hasMoreUsers: action.payload.hasMoreUsers,
        page: page + 1
      };
    case DELETE_USER:
      return _.omit(state.users, action.payload);
    default:
      return state;
  }
};
