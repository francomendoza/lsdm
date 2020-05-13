import React from "react";
import TemplateProperty from "./TemplateProperty";
import TemplateRelation from "./TemplateRelation";

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
