import React from "react";
import { createAndViewTemplateInstance } from "./actions/templateActions";
import { connect } from "react-redux";
import { createTemplateInstance } from "./api/templateInstances";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "./components/Button";
import Input from "./components/Input";
import {
  TemplatePropertyContainer,
  TemplatePropertyName,
} from "./TemplateProperty";

const TemplateRelation = (props) => {
  const navigate = useNavigate();
  const { templateInstanceId } = useParams();
  const location = useLocation();
  return (
    <TemplatePropertyContainer>
      <TemplatePropertyName>{props.name}</TemplatePropertyName>
      <Input type="text" />
      <Button
        onClick={() => {
          // 1. generate new instance
          // 2. navigate to that instance
          // 3. keep navigation history as breadcrumbs
          let newTemplateInstanceId = props.setVisibleTemplate();
          let query = `?graphPath=${templateInstanceId}`;
          if (location.search) {
            query = `${location.search},${templateInstanceId}`;
          }
          navigate(`/template_instances/${newTemplateInstanceId}${query}`);
        }}
      >
        Create New
      </Button>
    </TemplatePropertyContainer>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setVisibleTemplate: () => {
      let templateInstance = createTemplateInstance(ownProps.templateId);
      dispatch(createAndViewTemplateInstance(templateInstance));
      return templateInstance.id;
    },
  };
};

const mapStateToProps = (state) => {
  return {
    graphPath: state.templateGraphPath,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateRelation);
