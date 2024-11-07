import styled from "styled-components";

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  background-color: var(--im-gray);
  transition: all 0.15s;
  height: 100%;
`;

export const EditorHeader = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: flex-end;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  z-index: 1;
`;

export const EditorHeaderIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const EditorHeaderText = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: white;
  user-select: none;
  margin: 0px;
  margin-right: auto;
`;

export const EditorTextContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
`;

export const Button = styled.label`
  height: 20px;
  width: 20px;
  color: var(--im-lightgray);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  padding: 2px;
  transition: all 0.15s;

  &:hover {
    background-color: var(--im-primary);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export const HiddenEditorContainer = styled.div`
  padding: 2px;
  transition: all 0.15s;
`;

export const CustomHandle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2px;
  height: 100%;
  border-radius: 10px;
  position: absolute;
  right: 3px;
  top: 0;
  cursor: ew-resize;
  z-index: 1;
  &:hover,
  &:active {
    background-color: #008cff;
  }
`;
