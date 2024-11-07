import { Handle } from "@xyflow/react";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  padding: 15px;
  box-shadow: var(--im-shadow);
  background-color: var(--im-primary);
  border-radius: 10px;
  pointer-events: none;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  color: var(--im-white);
  width: 100%;
`;

export const TitleText = styled.p`
  margin: 0px;
  font-size: 25px;
  font-weight: bold;
`;

export const RegistersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  height: 100%;
  width: 100%;
  padding: 10px 20px;
`;

export const RegisterContainer = styled.div`
  display: flex;
  background-color: var(--im-white);
  color: var(--im-darkgray);
  padding: 3px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin: 0px 10px;
  border-radius: 3px;
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export const RegisterNumeration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  padding-left: 5px;
  padding-right: 5px;
`;

export const RegisterValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CustomHandle = styled(Handle)`
  background-color: transparent !important;
  border: none;
  pointer-events: none;
`;
