import { Handle } from "@xyflow/react";
import styled, { keyframes, css } from "styled-components";

const shine = (color) => keyframes`
  100% {
    background-color: ${color};
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
    transform: scale(1.01);
  }
`;

export const MainContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--im-primary);
  border-radius: 10px;
  padding: 25px;
  overflow: hidden;
  box-shadow: var(--im-shadow);
  cursor: ${(props) => (props.$operating ? "pointer" : "default")};
  pointer-events: ${(props) => (props.$operating ? "auto" : "none")};
  animation: ${(props) =>
    props.$operating
      ? css`
          ${shine(props.$color)} 0.7s infinite alternate
        `
      : "none"};

  &:hover {
    background-color: var(--im-primary-hover);
    box-shadow: var(--im-shadow-hover);
    animation: none;
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const SpecialRegisterContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

export const SpecialRegisterValue = styled.div`
  background-color: var(--im-white);
  border-radius: 5px;
  padding: 5px;
  color: var(--im-darkgray);
  min-width: ${(props) => (props.id == "PC" ? "50px" : "100px")};
  display: flex;
  justify-content: center;
`;

export const CustomText = styled.p`
  color: var(--im-white);
  font-size: 18px;
  font-weight: bold;
  margin: 0px;
`;

export const HeaderText = styled.p`
  color: var(--im-white);
  font-size: 25px;
  font-weight: bold;
  margin: 0px 0px 15px 0px;
`;

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const IndicatorText = styled.p.withConfig({
  shouldForwardProp: (prop) => !["animate"].includes(prop),
})`
  color: var(--im-white);
  font-size: 14px;
  font-weight: bold;
  margin: 20px 0px 0px 0px;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${pulse} 1s infinite;
    `}
`;

export const CustomHandle = styled(Handle)`
  background-color: transparent !important;
  border: none;
  pointer-events: none;
`;
