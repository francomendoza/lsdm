import styled from "styled-components";

const Button = styled.button`
  outline: none;
  background: transparent;
  border-radius: 3px;
  border: 2px solid var(--dark-green);
  color: var(--dark-green);
  margin: 0 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  &:hover,
  &:focus {
    background: var(--dark-green);
    color: #fff;
  }
`;

export default Button;
