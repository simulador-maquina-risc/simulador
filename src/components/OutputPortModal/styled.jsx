import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const Text = styled.p`
  margin: 0;
  user-select: none;
  font-weight: ${(props) => (props.$highlight ? "bold" : "normal")};
  font-size: ${(props) => (props.$highlight ? "24px" : "14px")};
`;

export const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  flex-direction: column;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;
  user-select: none;
  justify-content: center;
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

export const Line = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  user-select: none;
  border-top: 1px solid var(--im-primary);
`;
