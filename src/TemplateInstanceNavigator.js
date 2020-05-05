import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
      <BreadcrumbList>
        {props.templateGraphPath.map((node, i) => {
          return (
            <Breadcrumb
              key={node.id}
              templateInstance={node}
              path={props.templateGraphPath.slice(0, i)}
            />
          );
        })}
      </BreadcrumbList>
    </nav>
  );
};

const BreadcrumbList = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const StyledBreadCrumb = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 5px;
  font-size: 18px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    height: 50%;
    width: 100%;
    background: white;
    border-left: 2px solid var(--dark-green);
    border-right: 2px solid var(--dark-green);
  }
  &::before {
    top: -2px;
    transform: skew(30deg);
    border-top: 2px solid var(--dark-green);
  }
  &::after {
    bottom: -2px;
    transform: skew(-30deg);
    border-bottom: 2px solid var(--dark-green);
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  position: relative;
  line-height: 1.5;
  padding: 0 20px;
  color: #666;
  text-decoration: none;
  z-index: 1;
`;

const Breadcrumb = (props) => {
  // TODO: trigger state change to graph path when back navigating
  let query = "";
  if (props.path.length > 0) {
    query = `?graphPath=${props.path.map((node) => node.id).join(",")}`;
  }
  return (
    <StyledBreadCrumb>
      <StyledLink
        to={`/template_instances/${props.templateInstance.id}${query}`}
      >
        <span>{props.templateInstance.name}</span>
      </StyledLink>
    </StyledBreadCrumb>
  );
};

export default TemplateInstanceNavigator;
