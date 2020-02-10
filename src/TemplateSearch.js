import React, { useState } from "react";
import { connect } from "react-redux";
import { createAndViewTemplateInstance } from "./actions/templateActions";
import { createTemplateInstance } from "./api/templateInstances";
import styled from "styled-components";

const TemplateSearch = props => {
  let [query, updateQuery] = useState("");

  return (
    <div>
      <Search
        type="text"
        value={query}
        onChange={event => updateQuery(event.target.value)}
      />
      {props.templateIds
        .filter(id =>
          props.templatesById[id].name.toLowerCase().includes(query)
        )
        .map(templateId => {
          return (
            <Result
              key={templateId}
              onClick={() => {
                let templateInstance = createTemplateInstance(templateId);
                props.dispatch(createAndViewTemplateInstance(templateInstance));
                props.navigate(`template_instances/${templateInstance.id}`);
              }}
            >
              {props.templatesById[templateId].name}
            </Result>
          );
        })}
    </div>
  );
};

const Search = styled.input`
  margin: 20px 0;
  font-size: 20px;
  width: 100%;
`;

const Result = styled.div`
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    border-bottom: 2px solid var(--dark-green);
  }
`;

const mapStateToProps = state => {
  return {
    templateIds: state.templateIds,
    templatesById: state.templatesById
  };
};

export default connect(mapStateToProps)(TemplateSearch);
