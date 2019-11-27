import React from "react";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../store";
import history from "../history";
import { sessionExists } from "../utils/authUtility";

import Header from "./layout/Header";
import Landing from "./layout/Landing";
import LogIn from "./auth/LogIn";
import Register from "./auth/Register";

import UserList from "./user/UserList";
import UserCreate from "./user/UserCreate";
import UserDelete from "./user/UserDelete";
import UserEdit from "./user/UserEdit";

import SessionExpired from "./auth/SessionExpired";
import NotFound from "./auth/NotFound";
import ForbiddenAccess from "./auth/ForbiddenAccess";

if (!sessionExists(store.dispatch)) window.location.href = "/session_expired";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <div className="ui container">
            <Route exact path="/" component={Landing} />
            {
              //auth components
            }
            <Route exact path="/log_in" component={LogIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/session_expired" component={SessionExpired} />
            <Route exact path="/not_found" component={NotFound} />
            <Route exact path="/forbidden_access" component={ForbiddenAccess} />
            {
              //user components
            }
            <Route exact path="/user_edit/:id" component={UserEdit} />
            <Route exact path="/user_delete/:id" component={UserDelete} />
            <Route exact path="/user_create" component={UserCreate} />
            <Route exact path="/user_list" component={UserList} />
          </div>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
