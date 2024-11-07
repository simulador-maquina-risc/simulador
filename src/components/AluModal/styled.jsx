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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  box-sizing: border-box;
  z-index: 1;
  animation: 0.7s ${fadeIn} forwards;
`;

export const AluContainer = styled.div`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--im-gray);
  border-radius: 5px;
  background: var(--im-primary);
  clip-path: polygon(0 0, 100% 29%, 100% 67%, 0 100%, 0% 69%, 24% 48%, 0 29%);
  width: 550px;
  height: 580px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(2, 2, 2, 0.857);
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  padding: 30px;
  margin-right: 20px;
  justify-content: center;
  color: var(--im-lightgray);
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const OperationName = styled.div`
  border-radius: 15px;
  background-color: var(--im-white);
  padding: 5px 10px;
  color: var(--im-primary);
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const Info = styled.div`
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CloseButton = styled.div`
  cursor: pointer;
  right: 0;
  color: var(--im-lightgray);
  background-color: var(--im-red);
  border-radius: 5px;
  width: fit-content;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 15px;
  margin: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.1s;

  &:hover {
    opacity: 0.8;
  }
`;

export const Line = styled.div`
  background-color: var(--im-lightgray);
  height: 2px;
  margin: 10px 0;
  width: 50%;
`;

export const Bus = styled.div`
  height: 110px;
  width: 200px;
  background-color: var(--im-gray);
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: rgba(60, 60, 60, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

  &:nth-child(1) {
    margin-top: 20px;
  }

  &:nth-child(2) {
    margin-bottom: 20px;
  }
`;

export const StartBusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  height: 580px;
`;

export const EndBusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  height: 580px;

  ${Bus} {
    margin: 0px 0px 20px 0px;
  }
`;

export const CircledNumber = styled.div`
  color: var(--im-primary);
  background-color: var(--im-white);
  padding: 5px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  border-radius: 50%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

export const BitsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RowOperation = styled(Row)`
  margin-bottom: 15px;
  align-items: center;
`;

export const SignBit = styled.span`
  color: lightgreen;
`;

export const ExponentBits = styled.span`
  color: teal;
`;

export const MantissaBits = styled.span`
  color: lightblue;
`;

export const ResultRows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SlidesButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const SlidesContainer = styled.div`
  min-height: 170px;
`;

export const Slide = styled.div``;
