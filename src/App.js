import React from "react";
import "./App.css";
import Template from "./Template";
import { connect } from "react-redux";
import TemplateInstanceNavigator from "./TemplateInstanceNavigator";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import TemplateSearch from "./TemplateSearch";
import { updatePropertyValues } from "./actions/templateActions";

function App(props) {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TemplateSearch />} />
            <Route
              path="/template_instances/:templateInstanceId"
              element={<TemplateInstanceViewer />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

let TemplateInstanceViewer = (props) => {
  let { templateInstanceId } = useParams();
  let templateInstance = props.templateInstancesById[templateInstanceId];
  return (
    <div>
      <TemplateInstanceNavigator templateGraphPath={props.templateGraphPath} />
      <Template
        {...props.templatesById[templateInstance.templateId]}
        templateInstance={templateInstance}
        updatePropertyValues={props.updatePropertyValues}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    templateInstancesById: state.templateInstancesById,
    templatesById: state.templatesById,
    templateGraphPath: state.templateGraphPath.map((templateInstanceId) => {
      let templateInstance = state.templateInstancesById[templateInstanceId];
      let template = state.templatesById[templateInstance.templateId];
      return {
        id: templateInstance.id,
        name: template.name,
      };
    }),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePropertyValues: (templateInstanceId, index, value) => {
      dispatch(updatePropertyValues(templateInstanceId, index, value));
    },
  };
};

TemplateInstanceViewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateInstanceViewer);

export default App;
