import React from "react";
import { Container } from "./styled";

export const Button = ({ onClick, lightColor, children, disabled }) => {
  return (
    <Container onClick={onClick} $lightColor={lightColor} disabled={disabled}>
      {children}
    </Container>
  );
};
