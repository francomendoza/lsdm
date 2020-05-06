import React from "react";
import { updatePropertyValues } from "../actions/templateActions";
import Template from "../Template";
import { connect } from "react-redux";
import TemplateInstanceNavigator from "../TemplateInstanceNavigator";
import { useParams, useLocation } from "react-router-dom";

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateInstanceViewer);
