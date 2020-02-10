import React, { useState } from "react";
import { connect } from "react-redux";
import { createAndViewTemplateInstance } from "./actions/templateActions";
import { createTemplateInstance } from "./api/templateInstances";

const TemplateSearch = props => {
  let [query, updateQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={event => updateQuery(event.target.value)}
      />
      {props.templateIds
        .filter(id => props.templatesById[id].name.includes(query))
        .map(templateId => {
          return (
            <div
              key={templateId}
              onClick={() => {
                let templateInstance = createTemplateInstance(templateId);
                props.dispatch(createAndViewTemplateInstance(templateInstance));
                props.navigate(`template_instances/${templateInstance.id}`);
              }}
            >
              {props.templatesById[templateId].name}
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    templateIds: state.templateIds,
    templatesById: state.templatesById
  };
};

export default connect(mapStateToProps)(TemplateSearch);
