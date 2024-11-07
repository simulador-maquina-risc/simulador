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
  width: 1000px;
  max-height: 700px;
  padding: 10px;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: auto;
  text-align: center;
  box-sizing: border-box;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--im-gray);
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(10, 27, 45, 0.15);
  background: var(--im-primary);
  animation: 0.7s ${fadeIn} forwards;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--im-darkgray);
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(14, 13, 13, 0.589);
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: var(--im-white);
  padding-left: 10px;
`;

export const IconContainer = styled(IoClose)`
  cursor: pointer;
  right: 0;
  width: 24px;
  height: 24px;
  color: var(--im-lightgray);
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(32, 1fr);
  gap: 3px;
  height: 500px;
  border-radius: 2px;
  width: 100%;
  overflow-y: auto;
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  border: 1px solid var(--im-gray);
  width: 100px;
`;

export const CellData = styled.div`
  margin: 0;
  color: var(--im-white);
  font-size: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CellDirection = styled.div`
  margin: 0;
  color: var(--im-white);
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--im-terciary);
  width: 25px;
`;
