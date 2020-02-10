import React from "react";
import "./App.css";
import Template from "./Template";
import { connect } from "react-redux";
import TemplateInstanceNavigator from "./TemplateInstanceNavigator";
import { Router } from "@reach/router";
import TemplateSearch from "./TemplateSearch";

function App(props) {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-container">
        <Router>
          <TemplateSearch path="/" />
          <TemplateInstanceViewer path="/template_instances/:templateInstanceId" />
        </Router>
      </div>
    </div>
  );
}

let TemplateInstanceViewer = props => {
  return (
    <div>
      <TemplateInstanceNavigator templateGraphPath={props.templateGraphPath} />
      <Template {...props.template} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let templateInstance =
    state.templateInstancesById[ownProps.templateInstanceId];
  return {
    templateInstance,
    template: state.templatesById[templateInstance.templateId],
    templateGraphPath: state.templateGraphPath.map(templateInstanceId => {
      let templateInstance = state.templateInstancesById[templateInstanceId];
      let template = state.templatesById[templateInstance.templateId];
      return {
        id: templateInstance.id,
        name: template.name
      };
    })
  };
};

TemplateInstanceViewer = connect(mapStateToProps)(TemplateInstanceViewer);

export default App;
