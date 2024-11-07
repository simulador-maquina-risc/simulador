import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const ModalContainer = styled.div`
  background-color: var(--im-gray);
  position: absolute;
  right: 0;
  top: 50px;
  margin-right: 10px;
  padding: 20px 20px 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  gap: 10px;
  max-width: 350px;
  animation: 0.4s ${fadeIn} forwards;
`;

export const Title = styled.p`
  margin: 0px;
  font-size: 22px;
  font-weight: 650;
  color: var(--im-white);
`;

export const NumericBaseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const NumericBase = styled.div`
  padding: 5px;
  border-radius: 5px;
  border: none;
  color: var(--im-lightgray);

  background-color: var(--im-primary);
  font-size: 14px;
  font-weight: 600;
  padding: 5px 10px;
  width: 80px;
  &:focus {
    outline: 2px solid var(--im-secondary);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

export const InputLabel = styled.div`
  display: flex;
  width: 100%;
  color: var(--im-white);
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.$hasError ? "red" : "var(--im-primary)")};
  color: var(--im-darkgray);
  background-color: var(--im-lightgray);
  font-size: 14px;
  &::placeholder {
    color: var(--im-gray-lighter);
  }
  &:focus {
    outline: 2px solid var(--im-secondary);
    border: none;
  }
`;

export const ConvertButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: var(--im-white);
  background-color: var(--im-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: var(--im-terciary);
  }
  width: 100%;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  width: 100%;
`;

export const ResultLabel = styled.div`
  display: flex;
  width: 100%;
  color: var(--im-white);
`;

export const ResultValue = styled.div`
  color: var(--im-secondary);
  width: 100%;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  background-color: var(--im-lightgray);
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  padding: 3px;
  cursor: pointer;
  &:hover {
    background-color: var(--im-primary);
  }
  border: 1px solid var(--im-lightgray);
`;

export const ErrorMessageContainer = styled.span`
  font-size: 12px;
  color: red;
`;
