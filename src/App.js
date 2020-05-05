import React from "react";
import "./App.css";
import Template from "./Template";
import { connect } from "react-redux";
import TemplateInstanceNavigator from "./TemplateInstanceNavigator";
import { Router } from "@reach/router";
import TemplateSearch from "./TemplateSearch";
import { updatePropertyValues } from "./actions/templateActions";

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
      <Template
        {...props.template}
        templateInstance={props.templateInstance}
        updatePropertyValues={props.updatePropertyValues}
      />
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePropertyValues: (templateInstanceId, index, value) => {
      dispatch(updatePropertyValues(templateInstanceId, index, value));
    }
  };
};

TemplateInstanceViewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateInstanceViewer);

export default App;
