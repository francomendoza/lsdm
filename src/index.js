import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

function initializeState() {
  let templateInstances =
    JSON.parse(sessionStorage.getItem("templateInstances")) || [];
  let templateInstancesById = templateInstances.reduce(
    (memo, templateInstance) => {
      memo[templateInstance.id] = templateInstance;
      return memo;
    },
    {}
  );
  return { templateInstancesById };
}

const store = createStore(rootReducer, initializeState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
