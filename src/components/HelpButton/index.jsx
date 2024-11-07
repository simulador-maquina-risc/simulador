import React from 'react';
import { Container, TooltipText } from './styled';
import { IoMdHelpCircle } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setShowTutorial } from '../../slices/modalsSlice';
import { useSelector } from 'react-redux';

export const HelpButton = () => {
  const dispatch = useDispatch();
  const showTutorial = useSelector((state) => state.modals.tutorial);

  const onClickButton = () => {
    if (!showTutorial) {
      const fitViewButton = document.getElementsByClassName(
        'react-flow__controls-button react-flow__controls-fitview'
      );
      if (fitViewButton.length > 0) {
        fitViewButton[0].click();
      }
      dispatch(setShowTutorial(true));
    }
  };

  return (
    <Container>
      <IoMdHelpCircle
        size={40}
        onClick={onClickButton}
        onMouseEnter={(e) =>
          (e.currentTarget.nextSibling.style.visibility = 'visible')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.nextSibling.style.visibility = 'hidden')
        }
      />
      <TooltipText>Ayuda</TooltipText>
    </Container>
  );
};
