import React, { useState } from "react";
import { createAndViewTemplateInstance } from "./actions/templateActions";
import { useDispatch, useSelector } from "react-redux";
import { createTemplateInstance } from "./api/templateInstances";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "./components/Button";
import Input from "./components/Input";
import {
  TemplatePropertyContainer,
  TemplatePropertyName,
} from "./TemplateProperty";
import styled from "styled-components";
import { useClickOutsideListenerRef } from "./hooks";

const TemplateRelation = (props) => {
  const navigate = useNavigate();
  const { templateInstanceId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const options = useSelector((state) => {
    return (state.templateInstanceIdsByTemplateId[props.templateId] || []).map(
      (id) => {
        const templateInstance = state.templateInstancesById[id];
        return {
          value: templateInstance.propertyValues[0] || "",
          label: templateInstance.propertyValues[0] || "",
        };
      }
    );
  });

  return (
    <TemplatePropertyContainer>
      <TemplatePropertyName>{props.name}</TemplatePropertyName>
      <RelationSearch options={options} onSelect={({ value }) => {}} />
      <Button
        onClick={() => {
          const newTemplateInstance = createTemplateInstance(props.templateId);
          dispatch(createAndViewTemplateInstance(newTemplateInstance));

          let query = `?graphPath=${templateInstanceId}`;
          if (location.search) {
            query = `${location.search},${templateInstanceId}`;
          }

          navigate(`/template_instances/${newTemplateInstance.id}${query}`);
        }}
      >
        Create New
      </Button>
    </TemplatePropertyContainer>
  );
};

const RelationSearch = ({ options, onSelect }) => {
  const [isOpen, updateIsOpen] = useState(false);
  const [value, updateValue] = useState("");

  let optionsComponent;
  if (isOpen) {
    optionsComponent = (
      <SelectOptions
        options={options}
        closeOptions={() => updateIsOpen(false)}
        value={value}
        onSelect={onSelect}
      />
    );
  }

  return (
    <SelectContainer>
      <Input
        type="text"
        onChange={(evt) => {
          updateIsOpen(true);
          updateValue(evt.target.value);
        }}
        value={value}
      />
      {optionsComponent}
    </SelectContainer>
  );
};

const SelectOptions = ({ options, closeOptions, inputValue, onSelect }) => {
  const ref = useClickOutsideListenerRef(closeOptions);
  return (
    <OptionsContainer ref={ref}>
      {options
        .filter(({ label }) => label.includes(inputValue))
        .map((option, i) => {
          return (
            <Option
              key={option.value}
              onClick={() => {
                onSelect(option);
                closeOptions();
              }}
            >
              {option.label}
            </Option>
          );
        })}
      <Option>Create New</Option>
    </OptionsContainer>
  );
};

const OptionsContainer = styled.div`
  position: absolute;
  background-color: white;
  margin-top: -10px;
  width: inherit;
  z-index: 1;
  border-left: lightgrey 1px solid;
  border-right: lightgrey 1px solid;
  border-bottom: lightgrey 1px solid;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Option = styled.div`
  padding: 10px 5px;
  &:hover {
    background-color: var(--dark-green);
    color: white;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export default TemplateRelation;
