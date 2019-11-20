import React from "react";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../store";
import { sessionExists } from "../utils/authUtility";
import history from "../history";
import Header from "./layout/Header";
import Landing from "./layout/Landing";
import LogIn from "./auth/LogIn";
import Register from "./auth/Register";

if (!sessionExists(store.dispatch)) window.location.href = "/";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <div className="ui container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/log_in" component={LogIn} />
            <Route exact path="/register" component={Register} />
          </div>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
