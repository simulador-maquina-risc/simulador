import styled, { keyframes, css } from "styled-components";

const grow = keyframes`
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #023445 0%, #014055 50%, #012633 100%);
  color: white;
  font-size: 24px;
  z-index: 20;
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
  &.fade-out {
    animation: ${fadeOut} 1s ease-out forwards;
  }
`;

export const Icon = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  color: white;

  animation: ${(props) =>
    props.fadeOut
      ? css`
          ${spin} 1s ease-in-out
        `
      : css`
          ${grow} 1.25s ease-in-out forwards
        `};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: bold;
  animation: ${fadeIn} 1s ease-in-out;
`;

export const Subtitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: normal;
  margin-top: 10px;
  animation: ${fadeIn} 1s ease-in-out;
  opacity: 0;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
  margin-bottom: 30px;
`;

export const StartButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: var(--im-terciary);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 1s;
  opacity: 0;
  &:hover {
    background-color: var(--im-light-blue);
    box-shadow: var(--im-shadow-hover);
  }
`;
