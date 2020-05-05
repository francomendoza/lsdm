import React from "react";
import { createAndViewTemplateInstance } from "./actions/templateActions";
import "./Template.css";
import { connect } from "react-redux";
import { createTemplateInstance } from "./api/templateInstances";
import { navigate } from "@reach/router";

const TemplateProperty = props => {
  return (
    <div className="template-property-container">
      <div className="template-property-name">{props.name}</div>
      <div>
        <input
          type="text"
          className="template-property-input"
          value={props.value || ""}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

let TemplateRelation = props => {
  return (
    <div className="template-property-container">
      <div className="template-property-name">{props.name}</div>
      <input type="text" />
      <button onClick={props.setVisibleTemplate}>Create New</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setVisibleTemplate: () => {
      let templateInstance = createTemplateInstance(ownProps.templateId);
      dispatch(createAndViewTemplateInstance(templateInstance));
      navigate(`/template_instances/${templateInstance.id}`);
    }
  };
};

TemplateRelation = connect(null, mapDispatchToProps)(TemplateRelation);

const Template = props => {
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
              onChange={event => {
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
        {props.relatedTemplates.map(relatedTemplate => {
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
