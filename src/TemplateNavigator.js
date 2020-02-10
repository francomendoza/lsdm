import React from "react";

const TemplateNavigator = props => {
  return (
    <nav className="">
      <ol>
        {props.templateGraphPath.map(template => {
          return (
            <li key={template.id}>
              <a>
                <span>{template.name}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default TemplateNavigator;
