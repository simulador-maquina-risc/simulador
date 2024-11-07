import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 20px;
  height: 50px;
  width: 50px;
  z-index: 5;
  color: var(--im-lightgray);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
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
