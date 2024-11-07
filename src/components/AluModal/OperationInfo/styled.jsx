import styled from "styled-components";

export const SlidesButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const SlidesContainer = styled.div`
  min-height: 130px;
`;

export const Slide = styled.div``;

export const OperationDescription = styled.div`
  width: 300px;
`;

export const Line = styled.div`
  background-color: var(--im-lightgray);
  height: 2px;
  margin: 10px 0;
  width: 100%;
`;

export const TooltipText = styled.span`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 10px;
  position: absolute;
  z-index: 11;
  bottom: 100%;
  left: 50%;
  font-size: 14px;
  transform: translateX(-50%);
  white-space: nowrap;
  transition: opacity 0.1s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;
