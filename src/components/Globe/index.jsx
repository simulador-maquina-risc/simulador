import React, { useMemo } from "react";
import { Container, Content, Title, NoWrapContainer } from "./styled";

export const Globe = ({ id, arrowPosition, children, title, color }) => {
  const directionArrow = {
    left: { top: "50%", left: "-5px" },
    right: { top: "50%", left: "calc(100% - 10px)" },
    bottom: { top: "90%", left: "45%" },
    top: { top: "-5px", left: "40%" },
  };

  return (
    <Container key={id + "_globe"} $direction={directionArrow[arrowPosition]}>
      <Content>
        <Title $color={color || "var(--im-darkgray)"}>{title}</Title>
        <NoWrapContainer>{children}</NoWrapContainer>
      </Content>
    </Container>
  );
};
