import api from "../api";
import history from "../history";
import {
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  DELETE_USER,
  EDIT_USER
} from "./types";
import { usernameAlreadyExist } from "../utils/submitErrorUtility";

export const fetchUser = id => async dispatch => {
  try {
    const res = await api.get(`/user/${id}`);
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
  } catch (error) {
    console.error(error.response);
  }
};

export const fetchUsers = (page = 0, username = "") => async dispatch => {
  try {
    const res = await api.get("/user", {
      params: { page, username }
    });
    const hasMoreUsers = res.data.content.length === 10;
    dispatch({
      type: FETCH_USERS,
      payload: { users: res.data.content, page, hasMoreUsers }
    });
  } catch (error) {
    console.error(error.response);
  }
};

export const createUser = user => async dispatch => {
  try {
    console.log(user);
    const res = await api.post("/user", user);
    dispatch({
      type: CREATE_USER,
      payload: res.data
    });
    history.push("/");
  } catch (error) {
    usernameAlreadyExist(error);
  }
};

export const editUser = (id, user) => async dispatch => {
  try {
    const res = await api.put(`/user/${id}`, user);
    dispatch({
      type: EDIT_USER,
      payload: res.data
    });
    history.push("/");
  } catch (error) {
    usernameAlreadyExist(error);
  }
};

export const deleteUser = id => async dispatch => {
  try {
    await api.delete(`/user/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id
    });
    history.push("/");
  } catch (error) {
    console.error(error.response);
  }
};
