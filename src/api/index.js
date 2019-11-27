import axios from "axios";
import history from "../history";

const instance = axios.create();
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 403) {
      history.push("/forbidden_access");
    } else if (error.response.status === 404) {
      history.push("/not_found");
    }
    return Promise.reject(error);
  }
);

export default instance;
