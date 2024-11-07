import styled, { keyframes } from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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

export const Container = styled.div`
  height: 7 0px;
  background-color: var(--im-lightgray);
  z-index: 12;
  min-width: 80px;
  max-width: ${(props) => (props.$width ? props.$width : '600px')};
  border-radius: 16px;
  filter: drop-shadow(0px 1px 8px rgba(112, 135, 165, 0.39));
  display: flex !important;
  cursor: default !important;

  margin: 30px;

  &:before {
    content: '';
    position: absolute;
    border-radius: 0;
    height: ${(props) =>
      props.$direction.position === 'left' ||
      props.$direction.position === 'right'
        ? '20px'
        : '10px'};
    width: ${(props) =>
      props.$direction.position === 'left' ||
      props.$direction.position === 'right'
        ? '10px'
        : '20px'};
    background-color: var(--im-lightgray);
    top: ${(props) => props.$direction.top};
    left: ${(props) => props.$direction.left};
    display: ${(props) => (props.$direction.hide ? 'none' : '')};
    clip-path: ${(props) =>
      props.$direction.position === 'left'
        ? 'polygon(100% 0%, 100% 100%, 0% 50%)'
        : props.$direction.position === 'right'
        ? 'polygon(0% 0%, 100% 50%, 0% 100%)'
        : props.$direction.position === 'bottom'
        ? 'polygon(0% 0%, 100% 0%, 50% 100%)'
        : props.$direction.position === 'top'
        ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
        : ''};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  padding: 5px 0px;
  justify-content: space-between;
`;

export const CloseButton = styled.div`
  cursor: pointer;
  font-size: 11px;
  color: var(--im-darkgray);
  text-decoration: underline;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--im-darkgray);
  font-size: 15px;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$color};
`;

export const TextContainer = styled.div`
  p {
    text-align: left;
    margin: 0px 30px 10px 30px;
    font-size: 14px;
  }
`;

export const ModalBoxSetup = styled.div`
  position: fixed;
  z-index: 3;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  left: ${(props) => props.$position.left};
  top: ${(props) => props.$position.top};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  z-index: 5;
  animation: ${(props) => (props.$isClosing ? fadeOut : fadeIn)} 0.4s forwards;
  transition: top 0.7s ease, left 0.7s ease;
`;

export const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(14, 13, 13, 0.589);
`;

export const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--im-darkgray);
  background: linear-gradient(
    to right,
    var(--im-darkgray),
    var(--im-bluegray),
    var(--im-darkgray)
  );
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0px 20px 0px;
`;

export const MuiButton = muiStyled(Button)(({ theme }) => ({
  color: '#f4f4f4',
  backgroundColor: '#153a4b',
  padding: '3px 10px',
  textTransform: 'capitalize',
  fontSize: '12px',
  width: '100px',
  border: '1px solid #153a4b',
  '&:hover': {
    backgroundColor: 'rgba(21, 58, 75, 0.85)',
  },
  '&.Mui-disabled': {
    color: '#f4f4f4',
    backgroundColor: 'rgba(21, 58, 75, 0.7)',
  },
}));
