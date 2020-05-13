import React, { useState } from "react";
import { createAndViewTemplateInstance } from "../actions/templateActions";
import { createTemplateInstance } from "../api/templateInstances";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import Input from "../components/Input";

const TemplateSearch = () => {
  const dispatch = useDispatch();
  const templateIds = useSelector((state: RootState) => state.templateIds);
  const templatesById = useSelector((state: RootState) => state.templatesById);
  let [query, updateQuery] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Search
        type="text"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
      />
      {templateIds
        .filter((id) => templatesById[id].name.toLowerCase().includes(query))
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
              {templatesById[templateId].name}
            </Result>
          );
        })}
    </div>
  );
};

const Search = styled(Input)`
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

export default TemplateSearch;
