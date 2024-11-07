import React, { useEffect, useMemo, useState } from 'react';
import {
  CloseButton,
  Container,
  Content,
  Header,
  ModalBg,
  ModalBoxSetup,
  TextContainer,
  Title,
  StepperContainer,
  BodyContainer,
  MuiButton,
  Line,
} from './styled';
import { tutorialTexts } from './constants.jsx';
import { IoClose, IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { Button } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { setShowTutorial, setTutorialStep } from '../../slices/modalsSlice';
import MobileStepper from '@mui/material/MobileStepper';

export const Tutorial = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.modals.tutorialStep);
  const showTutorial = useSelector((state) => state.modals.tutorial);
  const [lastHighlightedElement, setLastHighlighted] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const directionArrow = {
    left: { top: '50%', left: '-10px', position: 'left' },
    right: { top: '50%', left: 'calc(100%)', position: 'right' },
    bottom: { top: '90%', left: '45%', position: 'bottom' },
    top: { top: '-10px', left: '50%', position: 'top' },
    none: { hide: true },
  };

  const tutorialStep = useMemo(() => {
    return tutorialTexts[step];
  }, [step]);

  useEffect(() => {
    if (showTutorial) {
      if (lastHighlightedElement) {
        lastHighlightedElement.style.zIndex = 0;
      }
      const elementToHighlight = document.getElementById(
        tutorialStep.highlight
      );
      if (elementToHighlight) {
        elementToHighlight.style.zIndex = 5;
        elementToHighlight.style.pointerEvents = 'none';
        setLastHighlighted(elementToHighlight);
      }
    } else {
      Object.keys(tutorialTexts).forEach((key) => {
        const element = document.getElementById(tutorialTexts[key].highlight);
        if (element) {
          element.style.pointerEvents = 'auto';
          element.style.zIndex = 0;
        }
      });
    }
  }, [showTutorial, step]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(setShowTutorial(false));
      setIsClosing(false);
    }, 400);
  };

  return (
    showTutorial && (
      <div>
        <ModalBoxSetup $position={tutorialStep.position} $isClosing={isClosing}>
          <Container
            $direction={directionArrow[tutorialStep.arrow]}
            $width={tutorialStep.position.maxWidth}
          >
            <Content>
              <Header>
                <Title>{tutorialStep.title}</Title>
                <CloseButton onClick={handleClose}>
                  <IoClose style={{ width: '20px', height: '20px' }} />
                </CloseButton>
              </Header>
              <Line />
              <BodyContainer>
                <TextContainer>{tutorialStep.content}</TextContainer>
                <StepperContainer>
                  <MobileStepper
                    variant="dots"
                    steps={5}
                    position="static"
                    activeStep={step}
                    sx={{
                      padding: '0px',
                      flexGrow: 1,
                    }}
                    nextButton={
                      <MuiButton
                        size="small"
                        variant="outlined"
                        endIcon={
                          step !== 4 && (
                            <IoArrowForward style={{ width: '15px' }} />
                          )
                        }
                        onClick={
                          step < 4
                            ? () => dispatch(setTutorialStep(step + 1))
                            : handleClose
                        }
                      >
                        {step === 0
                          ? 'Comenzar'
                          : step === 4
                          ? 'Finalizar'
                          : 'Siguiente'}
                      </MuiButton>
                    }
                    style={{ backgroundColor: 'transparent' }}
                    backButton={
                      step === 0 ? (
                        <div style={{ width: '110px' }} />
                      ) : (
                        <MuiButton
                          variant="outlined"
                          size="small"
                          disabled={step === 0}
                          startIcon={<IoArrowBack style={{ width: '15px' }} />}
                          onClick={() => dispatch(setTutorialStep(step - 1))}
                        >
                          Anterior
                        </MuiButton>
                      )
                    }
                  />
                </StepperContainer>
                <p
                  style={{
                    margin: '0px',
                    fontSize: '12px',
                  }}
                >
                  {step + 1} de {Object.keys(tutorialTexts).length}
                </p>
              </BodyContainer>
            </Content>
          </Container>
        </ModalBoxSetup>
        <ModalBg />
      </div>
    )
  );
};
