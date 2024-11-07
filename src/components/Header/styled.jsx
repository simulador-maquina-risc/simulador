import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 5px 10px;
  background-color: var(--im-darkgray);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
  user-select: none;
`;

export const HeaderTitle = styled.div`
  font-size: 15px;
  color: var(--im-lightgray);
  font-weight: 700;
  user-select: none;
`;

export const HeaderSelect = styled.select`
  background-color: var(--im-darkgray);
  color: var(--im-lightgray);
  border: 1px solid var(--im-lightgray);
  font-size: 12px;
  font-weight: 700;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
`;

export const HeaderOption = styled.option`
  background-color: var(--im-darkgray);
  color: var(--im-lightgray);
  font-size: 12px;
  user-select: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

export const HeaderCyclesColorReference = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--im-lightgray);
  border: 2px solid var(--im-gray);
  border-radius: 5px;
  padding: 3px 5px 3px 5px;
  font-size: 14px;
  font-weight: bold;
`;

export const FetchPipeliningCycle = styled.div`
  margin-right: 5px;
`;

export const PipeliningCycle = styled.div`
  border-left: 2px solid var(--im-gray);
  margin-right: 5px;
  padding-left: 5px;
  margin-left: 5px;
`;

export const Cycle = styled.div`
  margin-right: 5px;
`;

export const CalculatorButton = styled.button`
  padding-top: 5px;
  border: 2px solid var(--im-gray);
  border-radius: 5px;
  cursor: pointer;
`;

export const TooltipText = styled.span`
  visibility: hidden;
  opacity: 0;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  top: 110%;
  left: 50%;
  font-size: 14px;
  transform: translateX(-50%);
  white-space: nowrap;
  transition: opacity 0.1s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
  }
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${TooltipText} {
    visibility: visible;
    opacity: 1;
  }
`;
