import React from "react";
import "./App.css";
import Template from "./Template";
import { connect } from "react-redux";
import TemplateInstanceNavigator from "./TemplateInstanceNavigator";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let graphPathQuery = (query) => {
  if (query) {
    return query.split(",");
  } else {
    return [];
  }
};

let TemplateInstanceViewer = (props) => {
  let { templateInstanceId } = useParams();
  let query = useQuery();

  let graphPath = graphPathQuery(query.get("graphPath")).map((id) => {
    let templateInstance = props.templateInstancesById[id];
    let template = props.templatesById[templateInstance.templateId];
    return {
      id: id,
      name: template.name,
    };
  });

  let templateInstance = props.templateInstancesById[templateInstanceId];
  return (
    <div>
      <TemplateInstanceNavigator templateGraphPath={graphPath} />
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
