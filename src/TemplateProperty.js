import React from "react";
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

export const TemplatePropertyContainer = styled.div`
  margin-bottom: 20px;
`;

export const TemplatePropertyName = styled.div`
  margin-bottom: 10px;
`;

export default TemplateProperty;
