import React, { useState } from "react";
import { connect } from "react-redux";
import { createAndViewTemplateInstance } from "../actions/templateActions";
import { createTemplateInstance } from "../api/templateInstances";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TemplatesById, RootState } from "../reducers";

type TemplateSearchProps = {
  templateIds: Array<string>;
  templatesById: TemplatesById;
};

const TemplateSearch = (props: TemplateSearchProps) => {
  const dispatch = useDispatch();
  let [query, updateQuery] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Search
        type="text"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
      />
      {props.templateIds
        .filter((id) =>
          props.templatesById[id].name.toLowerCase().includes(query)
        )
        .map((templateId) => {
          return (
            <Result
              key={templateId}
              onClick={() => {
                let templateInstance = createTemplateInstance(templateId);
                dispatch(createAndViewTemplateInstance(templateInstance));
                navigate(`template_instances/${templateInstance.id}`);
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

const mapStateToProps = (state: RootState) => {
  return {
    templateIds: state.templateIds,
    templatesById: state.templatesById,
  };
};

export default connect(mapStateToProps)(TemplateSearch);
