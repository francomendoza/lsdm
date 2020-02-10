import React from "react";
import "./App.css";
import Template from "./Template";
import { connect } from "react-redux";
import TemplateNavigator from "./TemplateNavigator";

function App(props) {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-container">
        <TemplateNavigator templateGraphPath={props.templateGraphPath} />
        <Template {...props.template} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  let templateInstance =
    state.templateInstancesById[state.visibleTemplateInstanceId];
  return {
    templateInstance,
    template: state.templatesById[templateInstance.templateId],
    templateGraphPath: state.templateGraphPath.map(templateId => {
      let template = state.templatesById[templateId];
      return {
        id: templateId,
        name: template.name
      };
    })
  };
};

export default connect(mapStateToProps)(App);
