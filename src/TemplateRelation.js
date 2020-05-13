import React from "react";
import { createAndViewTemplateInstance } from "./actions/templateActions";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  return (
    <TemplatePropertyContainer>
      <TemplatePropertyName>{props.name}</TemplatePropertyName>
      <Input type="text" />
      <Button
        onClick={() => {
          const newTemplateInstance = createTemplateInstance(props.templateId);
          dispatch(createAndViewTemplateInstance(templateInstance));

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

export default TemplateRelation;
