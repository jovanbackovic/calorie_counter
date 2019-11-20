import { LOG_OUT, SET_CURRENT_USER } from "../actions/types";

const initialState = {
  loggedUser: null,
  roles: []
};

export default (state = { initialState }, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { loggedUser: action.payload.user, roles: action.payload.roles };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
