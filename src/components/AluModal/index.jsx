import React, { useEffect, useState } from "react";
import {
  AluContainer,
  Bus,
  StartBusContainer,
  CloseButton,
  InfoContainer,
  ModalBg,
  ModalBoxSetup,
  ModalContainer,
  ModalWrapper,
  EndBusContainer,
  OperationName,
  Line,
  CircledNumber,
  ButtonContainer,
  Row,
  RowOperation,
} from "./styled";
import { FloatingPointSlides } from "./FloatingPointSlides";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoArrowForward } from "react-icons/io5";
import { setOpenAluZoom } from "../../slices/modalsSlice";
import { Button } from "../Button";
import { toBinaryComplement } from "../../interpreter/utils.js";
import OperationInfo from "./OperationInfo/index.jsx";

export const AluModal = () => {
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(false);
  const showModal = useSelector((state) => state.modals.aluZoom);
  const aluOperation = useSelector(
    (state) => state.application.execute.aluOperation
  );

  const result = (aluOperation?.result ?? 0).toString().padStart(8, "0");
  const firstEightBits = result.slice(0, 8);

  const registerSbits = toBinaryComplement(aluOperation?.registerS ?? "0");

  const registerTbits = toBinaryComplement(aluOperation?.registerT ?? "0");

  const handleShowResult = () => {
    setShowResult(true);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  useEffect(() => {
    setShowResult(false);
    setCurrentSlide(0);
  }, [showModal]);

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <StartBusContainer>
              <Bus>
                Registro S:
                <CircledNumber>{aluOperation.registerSIndex}</CircledNumber>
              </Bus>
              <Bus>
                Registro T:
                <CircledNumber>{aluOperation.registerTIndex}</CircledNumber>
              </Bus>
            </StartBusContainer>

            <AluContainer>
              {aluOperation && (
                <>
                  {aluOperation.operation === "Suma en punto flotante" ? (
                    <FloatingPointSlides
                      aluOperation={aluOperation}
                      registerSbits={registerSbits}
                      registerTbits={registerTbits}
                      currentSlide={currentSlide}
                      prevSlide={prevSlide}
                      nextSlide={nextSlide}
                    />
                  )  : (
                    <OperationInfo
                      aluOperationName={aluOperation.operation}
                      registerSbits={registerSbits}
                      registerTbits={registerTbits}
                      firstEightBits={firstEightBits}
                      showResult={showResult}
                      result={result}
                      handleShowResult={handleShowResult}
                    />
                  )}
                </>
              )}
            </AluContainer>

            <EndBusContainer>
              <Bus>
                Registro R (destino):
                <CircledNumber>{aluOperation.destinationIndex}</CircledNumber>
              </Bus>
            </EndBusContainer>
          </ModalContainer>
          <CloseButton onClick={() => dispatch(setOpenAluZoom(false))}>
            Cerrar
            <IoClose />
          </CloseButton>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
