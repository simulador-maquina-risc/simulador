import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ModalContainer,
  NumericBase,
  NumericBaseContainer,
  Title,
  InputContainer,
  Input,
  InputLabel,
  ConvertButton,
  ResultContainer,
  ResultLabel,
  ResultValue,
  IconContainer,
  ErrorMessageContainer,
} from "./styled";
import { IoSwapHorizontal } from "react-icons/io5";
import { numericBaseType } from "../../interpreter/constants";
import { toBinaryComplement, inputHasError } from "../../interpreter/utils";
import { setOpenCalculatorModal } from "../../slices/modalsSlice";

const CalculatorModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modals.calculatorModal);
  const [mode, setMode] = useState("hexaToBinary");
  const [inputValue, setInputValue] = useState("");
  const [resultValue, setResultValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      modalRef.current?.focus();
    } else {
      setInputValue("");
      setResultValue(null);
      setErrorMessage(null);
    }
  }, [showModal]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getNewResult();
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage(null);
  };

  const onClose = (e) => {
    const calculatorButton = document.getElementById("calculatorButton");
    if (
      !e.currentTarget.contains(e.relatedTarget) &&
      e.relatedTarget !== calculatorButton
    ) {
      dispatch(setOpenCalculatorModal(false));
    }
  };

  const getNewResult = () => {
    const applicationError = inputHasError(
      inputValue,
      mode === "hexaToBinary" ? numericBaseType.HEXA : numericBaseType.BINARY
    );
    if (applicationError !== null) {
      setResultValue(null);
      setErrorMessage(applicationError);
      return;
    }
    let newResult = inputValue;
    if (mode === "hexaToBinary") {
      newResult = toBinaryComplement(inputValue);
    } else {
      newResult = parseInt(inputValue, 2)
        .toString(16)
        .toUpperCase()
        .padStart(2, "0");
    }
    setResultValue(newResult);
  };

  return (
    showModal && (
      <ModalContainer ref={modalRef} tabIndex={0} onBlur={onClose}>
        <Title>Conversor de base numérica</Title>
        <NumericBaseContainer>
          <NumericBase>
            {mode === "hexaToBinary" ? "Hexadecimal" : "Binario"}
          </NumericBase>
          <IconContainer
            onClick={() =>
              setMode((prev) =>
                prev === "hexaToBinary" ? "binaryToHexa" : "hexaToBinary"
              )
            }
          >
            <IoSwapHorizontal />
          </IconContainer>
          <NumericBase>
            {mode === "hexaToBinary" ? "Binario" : "Hexadecimal"}
          </NumericBase>
        </NumericBaseContainer>
        <InputContainer>
          <InputLabel>{"Número a convertir:"}</InputLabel>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              textAlign: "left",
            }}
          >
            <Input
              placeholder={
                "Ingrese un número " +
                (mode === "hexaToBinary" ? "hexadecimal" : "binario")
              }
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              $hasError={errorMessage !== null}
            />
            {errorMessage && (
              <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
            )}
          </div>
        </InputContainer>
        <ConvertButton onClick={getNewResult}>
          {"Convertir a " +
            (mode === "hexaToBinary" ? "binario" : "hexadecimal")}
        </ConvertButton>
        {resultValue !== null && (
          <ResultContainer>
            <ResultLabel>Resultado</ResultLabel>
            <ResultValue>{resultValue}</ResultValue>
          </ResultContainer>
        )}
      </ModalContainer>
    )
  );
};

export default CalculatorModal;
