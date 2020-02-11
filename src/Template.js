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
        <input type="text" className="template-property-input" />
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
        {props.properties.map(property => {
          return <TemplateProperty key={props.templateInstance.id + property.name} {...property} />;
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
