import styled from "styled-components";

const Input = styled.input`
  margin-bottom: 10px;
  padding: 2px 5px;
  border: none;
  outline: none;
  border-bottom: 1px solid lightgrey;
  width: 100%;
  font-size: var(--font-size);
  &:hover {
    border-bottom: 1px solid black;
  }
`;

export default Input;
