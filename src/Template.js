import React from "react";
import { createAndViewTemplateInstance } from "./actions/templateActions";
import "./Template.css";
import { connect } from "react-redux";
import { createTemplateInstance } from "./api/templateInstances";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "./components/Input";

const TemplateProperty = (props) => {
  return (
    <TemplatePropertyContainer>
      <TemplatePropertyName>{props.name}</TemplatePropertyName>
      <div>
        <Input
          type="text"
          value={props.value || ""}
          onChange={props.onChange}
        />
      </div>
    </TemplatePropertyContainer>
  );
};

const TemplatePropertyContainer = styled.div`
  margin-bottom: 20px;
`;

const TemplatePropertyName = styled.div`
  margin-bottom: 10px;
`;

let TemplateRelation = (props) => {
  const navigate = useNavigate();
  return (
    <div className="template-property-container">
      <div className="template-property-name">{props.name}</div>
      <input type="text" />
      <Button onClick={() => props.setVisibleTemplate(navigate)}>
        Create New
      </Button>
    </div>
  );
};

const Button = styled.button`
  outline: none;
  background: transparent;
  border-radius: 3px;
  border: 2px solid var(--dark-green);
  color: var(--dark-green);
  margin: 0 1em;
  padding: 0.25em 1em;
  cursor: pointer;
`;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setVisibleTemplate: (navigate) => {
      let templateInstance = createTemplateInstance(ownProps.templateId);
      dispatch(createAndViewTemplateInstance(templateInstance));
      navigate(`/template_instances/${templateInstance.id}`);
    },
  };
};

TemplateRelation = connect(null, mapDispatchToProps)(TemplateRelation);

const Template = (props) => {
  return (
    <div className="template-container">
      <h2>{props.name}</h2>
      <h4>Properties:</h4>
      <div>
        {props.properties.map((property, i) => {
          return (
            <TemplateProperty
              key={props.templateInstance.id + property.name}
              {...property}
              value={props.templateInstance.propertyValues[i]}
              onChange={(event) => {
                props.updatePropertyValues(
                  props.templateInstance.id,
                  i,
                  event.target.value
                );
              }}
            />
          );
        })}
      </div>
      <h4>Related Nodes:</h4>
      <div>
        {props.relatedTemplates.map((relatedTemplate) => {
          return (
            <TemplateRelation
              key={relatedTemplate.id + relatedTemplate.name}
              parentTemplateId={props.id}
              {...relatedTemplate}
            />
          );
        })}
      </div>
      <div>{props.description}</div>
    </div>
  );
};

export default Template;
