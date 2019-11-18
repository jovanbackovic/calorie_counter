import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const initialState = {};
const middleware = [thunk];
let store;

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools) {
  store = createStore(
    reducers,
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
  );
} else {
  store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
