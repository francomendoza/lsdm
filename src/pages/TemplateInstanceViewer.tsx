import React from "react";
import { updatePropertyValues } from "../actions/templateActions";
import Template from "../Template";
import { useDispatch, useSelector } from "react-redux";
import TemplateInstanceNavigator from "../TemplateInstanceNavigator";
import { useParams, useLocation } from "react-router-dom";
import { RootState } from "../reducers";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let graphPathQuery = (query: string | null) => {
  if (query) {
    return query.split(",");
  } else {
    return [];
  }
};

let TemplateInstanceViewer = () => {
  let { templateInstanceId } = useParams();
  let query = useQuery();
  const dispatch = useDispatch();
  const templateInstancesById = useSelector(
    (state: RootState) => state.templateInstancesById
  );
  const templatesById = useSelector((state: RootState) => state.templatesById);

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
        updatePropertyValues={(
          templateInstanceId: string,
          index: number,
          value: string
        ) => {
          dispatch(updatePropertyValues(templateInstanceId, index, value));
        }}
      />
    </div>
  );
};

export default TemplateInstanceViewer;
