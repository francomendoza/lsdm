import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import templates from "./api/templates";

function initializeState() {
  let templateInstancesById =
    JSON.parse(sessionStorage.getItem("templateInstancesById")) || {};
  let templatesById = {};
  let templateIds = [];
  const templateInstanceIdsByTemplateId = Object.keys(
    templateInstancesById
  ).reduce((memo, id) => {
    const templateInstance = templateInstancesById[id];
    if (memo[templateInstance.templateId]) {
      memo[templateInstance.templateId].push(id);
    } else {
      memo[templateInstance.templateId] = [id];
    }
    return memo;
  }, {});
  templates.forEach((template) => {
    templatesById[template.id] = template;
    templateIds.push(template.id);
  });
  return {
    templateInstancesById,
    templateIds,
    templatesById,
    templateInstanceIdsByTemplateId,
  };
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
