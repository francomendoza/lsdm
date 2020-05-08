import React from "react";
import { updatePropertyValues } from "../actions/templateActions";
import Template from "../Template";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const templateInstancesById = useSelector(
    (state) => state.templateInstancesById
  );
  const templatesById = useSelector((state) => state.templatesById);

  let graphPath = graphPathQuery(query.get("graphPath")).map((id) => {
    let templateInstance = templateInstancesById[id];
    let template = templatesById[templateInstance.templateId];
    return {
      id: id,
      name: template.name,
    };
  });

  let templateInstance = templateInstancesById[templateInstanceId];
  return (
    <div>
      <TemplateInstanceNavigator templateGraphPath={graphPath} />
      <Template
        {...templatesById[templateInstance.templateId]}
        templateInstance={templateInstance}
        updatePropertyValues={(templateInstanceId, index, value) => {
          dispatch(updatePropertyValues(templateInstanceId, index, value));
        }}
      />
    </div>
  );
};

export default TemplateInstanceViewer;
