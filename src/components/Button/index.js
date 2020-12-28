import React from "react";

import { Container } from "./styles";


const Button = ({ children, ...rest }) => (
  <Container>
    <button {...rest}>{children}</button>
  </Container>
);

export default Button;
