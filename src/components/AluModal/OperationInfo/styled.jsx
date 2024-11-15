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

export const CustomButton = styled.button`
  border: none;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  padding-left: 10px;
  padding-right: 10px;
  color: ${(props) =>
    props.$lightColor ? "var(--im-primary)" : "var(--im-lightgray)"};
  background-color: ${(props) =>
    props.$lightColor ? "var(--im-lightgray)" : "var(--im-primary)"};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: all 0.1s;

  &:hover {
    background-color: var(--im-terciary);
    color: var(--im-lightgray);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  &:disabled {
    background-color: var(--im-gray);
    cursor: not-allowed;
  }
`;

export const DescriptionTooltip = styled.span`
  position: relative;

  &:before {
    content: "Descripción";
    font-size: 15px;
    font-weight: lighter;
    position: absolute;
    bottom: -39px;
    transform: translateX(-50%);
    left: 0%;
    margin-left: 15px;
    opacity: 80%;
    width: 100px;
    padding: 5px;
    border-radius: 10px;
    background-color: #333;
    text-align: center;
    display: none;
  }

  &:hover:before {
    display: block;
  }
`;

export const OperationTooltip = styled.span`
  position: relative;

  &:before {
    content: "Operación";
    font-size: 15px;
    font-weight: lighter;
    position: absolute;
    bottom: -35px;
    transform: translateX(-50%);
    left: 0%;
    margin-left: 22px;
    opacity: 80%;
    width: 100px;
    padding: 3px;
    border-radius: 10px;
    background-color: #333;
    text-align: center;
    display: none;
  }

  &:hover:before {
    display: block;
  }
`;
