import { CgClose } from "react-icons/cg";
import styled from "styled-components";

export const Container = styled.div`
  /* position: absolute; */
  height: 7 0px;
  background-color: var(--im-white-gray);
  z-index: 1;
  min-width: 80px;
  border-radius: 16px;
  filter: drop-shadow(0px 1px 8px rgba(112, 135, 165, 0.39));
  display: flex !important;
  cursor: default !important;
  padding: 5px;
  margin: 5px;

  &:before {
    content: "";
    position: absolute;
    border-radius: 0;
    height: 15px;
    width: 15px;
    background-color: var(--im-white-gray);
    top: ${(props) => props.$direction.top};
    left: ${(props) => props.$direction.left};
    transform: rotate(45deg);
  }
`;

export const Content = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--im-darkgray);
  font-size: 16px;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.div`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.$color};
`;

export const NoWrapContainer = styled.div`
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// export const CloseButton = styled(CgClose)`
//   width: 10px;
//   padding-top: 6px;
//   color: #6e7a8a;
//   cursor: pointer;
// `;
