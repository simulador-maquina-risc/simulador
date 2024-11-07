import styled, { keyframes, css } from "styled-components";
import { Handle } from "@xyflow/react";

const shine = (color) => keyframes`
  100% {
    background-color: ${color};
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2),
                0 0 10px rgba(255, 255, 255, 0.2),
                0 0 20px rgba(255, 255, 255, 0.2),
                0 0 30px rgba(255, 255, 255, 0.2),
                0 0 40px rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--im-white);
  background: var(--im-primary);
  width: 190px;
  height: 220px;
  clip-path: polygon(0 0, 100% 29%, 100% 67%, 0 100%, 0% 69%, 24% 48%, 0 29%);
  box-shadow: var(--im-shadow);
  cursor: pointer;
  animation: ${(props) =>
    props.$operating
      ? css`
          ${shine(props.$color)} 0.7s infinite alternate
        `
      : "none"};
  /*&:hover {
    background-color: var(--im-primary-hover);
    box-shadow: var(--im-shadow-hover);
    animation-play-state: paused;
  }*/
`;

export const CustomHandle = styled(Handle)`
  background-color: transparent !important;
  border: none;
  pointer-events: none;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 50px;
  align-self: center;
  justify-self: center;
  display: flex;
  top: auto;
`;

export const AluTitle = styled.p`
  color: var(--im-white);
  font-weight: bold;
  font-size: 22px;
  margin: 0;
`;
