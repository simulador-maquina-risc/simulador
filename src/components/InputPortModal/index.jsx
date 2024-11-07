import React, { useRef, useState, useEffect } from "react";
import { Modal } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentState } from "../../slices/applicationSlice";
import {
  BodyContainer,
  Container,
  ErrorMessage,
  FooterContainer,
  Input,
  Line,
  RadioGroup,
  RadioInput,
  RadioLabel,
  Text,
} from "./styled";
import { Button } from "../Button";
import { numericBaseType } from "../../interpreter/constants";
import {
  controlUnitMainMemAddrId,
  mainMemControlUnitDataId,
  registersControlUnitId,
} from "../../containers/SimulatorSection/components";
import { inputHasError } from "../../interpreter/utils";

export const InputPortModal = () => {
  const dispatch = useDispatch();
  const applicationState = useSelector((state) => state.application);
  const showModal = useSelector(
    (state) => state.application.execute.showInputPort
  );

  const updateRegister = useSelector(
    (state) => state.application.execute.registerToUpdate
  );

  const [inputValue, setInputValue] = useState("");
  const [numericBase, setNumericBase] = useState(numericBaseType.HEXA);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    setNumericBase(event.target.value);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const getHexaValue = () => {
    if (numericBase === numericBaseType.BINARY) {
      return parseInt(inputValue, 2).toString(16).toUpperCase();
    } else if (numericBase === numericBaseType.HEXA) {
      return inputValue.toUpperCase();
    }
  };

  const handleSave = () => {
    const applicationError = inputHasError(inputValue, numericBase);
    if (applicationError !== null) {
      setError(applicationError);
      return;
    }
    setInputValue("");
    const { execute: currentExecuteState } = applicationState;
    const newExecuteState = {
      ...currentExecuteState,
      registers: [...currentExecuteState.registers],
      mainMemoryCells: [...currentExecuteState.mainMemoryCells],
      showInputPort: false,
      registerToUpdate: null,
    };

    const newValue = getHexaValue();
    newExecuteState.registers[updateRegister] = newValue;
    newExecuteState.mainMemoryCells[254] = newValue;
    newExecuteState.edgeAnimation = [
      {
        id: registersControlUnitId,
        reverse: true,
        data: newValue,
        address: updateRegister,
      },
      { id: controlUnitMainMemAddrId, address: 254 },
      { id: mainMemControlUnitDataId, reverse: false, data: newValue },
    ];
    const newState = {
      ...applicationState,
      execute: newExecuteState,
    };
    dispatch(updateCurrentState(newState));
    setError("");
    setNumericBase(numericBaseType.HEXA);
  };

  return (
    showModal && (
      <Modal title={"Puerto de entrada"} msg={null}>
        <Container>
          <BodyContainer>
            <Text>Valor de entrada</Text>
            <Input
              ref={inputRef}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              value={inputValue}
              $hasError={error !== ""}
            />
            <ErrorMessage>{error}</ErrorMessage>

            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="number-system"
                  value={numericBaseType.HEXA}
                  checked={numericBase === numericBaseType.HEXA}
                  onChange={handleChange}
                />
                Hexadecimal
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="number-system"
                  value={numericBaseType.BINARY}
                  checked={numericBase === numericBaseType.BINARY}
                  onChange={handleChange}
                />
                Binario
              </RadioLabel>
            </RadioGroup>
          </BodyContainer>
          <Line />
          <FooterContainer>
            <Button onClick={handleSave}>Enviar</Button>
          </FooterContainer>
        </Container>
      </Modal>
    )
  );
};
