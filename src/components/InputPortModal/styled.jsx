import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5px;
  height: 100%;
`;

export const Text = styled.p`
  margin: 0;
  user-select: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.$hasError ? "red" : "var(--im-primary)")};
  background-color: white;
  color: black;
  box-sizing: border-box;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  color: red;
  font-size: 10px;
  user-select: none;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Line = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  user-select: none;
  border-top: 1px solid var(--im-primary);
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
  user-select: none;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  margin-right: 8px;
  width: 12px;
  height: 12px;
  &:checked {
    accent-color: var(--im-primary);
  }
`;
