import React from "react";
import { Link } from "@reach/router";

const TemplateInstanceNavigator = props => {
  return (
    <nav>
      <ol>
        {props.templateGraphPath.map(node => {
          return <Breadcrumb key={node.id} templateInstance={node} />;
        })}
      </ol>
    </nav>
  );
};

const Breadcrumb = props => {
  return (
    <li>
      <Link to={`/template_instances/${props.templateInstance.id}`}>
        <span>{props.templateInstance.name}</span>
      </Link>
    </li>
  );
};

export default TemplateInstanceNavigator;
