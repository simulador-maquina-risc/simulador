import { IoClose } from "react-icons/io5";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const ModalBoxSetup = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: block;
  margin: 0 auto;
  max-width: 900px;
  max-height: 800px;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--im-gray);
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(10, 27, 45, 0.15);
  background: var(--im-secondary);
  animation: 0.7s ${fadeIn} forwards;
`;

export const ModalContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--im-darkgray);
  overflow: hidden;
  background-color: var(--im-primary);
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(14, 13, 13, 0.589);
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  color: var(--im-lightgray);
  background-color: var(--im-secondary);
  box-shadow: 0 0 20px 0 rgba(10, 27, 45, 0.15);
`;

export const IconContainer = styled(IoClose)`
  cursor: pointer;
  right: 0;
  width: 24px;
  height: 24px;
  margin-left: auto;
  text-align: right;
  color: var(--im-lightgray);
`;

export const ScrollableContainer = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: auto;
`;

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
  background-color: var(--im-secondary);
`;

export const TableHeaderRow = styled.tr`
  border-bottom: 2px solid var(--im-terciary);
  border-top: 2px solid var(--im-terciary);
`;

export const TableHeaderCell = styled.th`
  padding: 12px 16px;
  font-weight: bold;
  font-size: 14px;
  color: var(--im-lightgray);
`;

export const TableBody = styled.tbody`
  background-color: var(--im-primary);
`;

export const TableBodyRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--im-secondary);
  }

  transition: background-color 0.2s ease;
`;

export const TableData = styled.td`
  font-size: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--im-terciary);
  text-align: center;
  color: var(--im-lightgray);
  font-weight: bold;
  &:nth-child(3) {
    font-weight: normal;
    color: var(--im-lightgray);
  }
`;

export const OperatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #012733;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0 10px;
`;
