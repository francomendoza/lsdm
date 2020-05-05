import React from "react";
import { Link } from "@reach/router";

/*
Ideally this would work by keeping track of where you are in the subtree
as you click deeper into new nodes.

When you navigate with browser buttons...
click back...
user should be taken to the previous instance with the most recent instance removed
click forward...
user should be taken to the new instance with the breadcrumb put back

when you navigate with breadcrumb...
you should see all the following breadcrumbs 
templateInstance/:id?path=id,id
 */

const TemplateInstanceNavigator = (props) => {
  return (
    <nav>
      <ol>
        {props.templateGraphPath.map((node, i) => {
          return (
            <Breadcrumb
              key={node.id}
              templateInstance={node}
              path={props.templateGraphPath.slice(0, i + 1)}
            />
          );
        })}
      </ol>
    </nav>
  );
};

const Breadcrumb = (props) => {
  return (
    <li>
      <Link
        to={`/template_instances/${
          props.templateInstance.id
        }?graphPath=${props.path.map((node) => node.id).join(",")}`}
      >
        <span>{props.templateInstance.name}</span>
      </Link>
    </li>
  );
};

export default TemplateInstanceNavigator;
