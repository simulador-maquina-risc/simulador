import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowOutputPort } from "../../slices/applicationSlice";
import { numericBaseType } from "../../interpreter/constants";
import {
  BodyContainer,
  Container,
  Text,
  RadioGroup,
  RadioLabel,
  RadioInput,
  Line,
} from "./styled";
import { convertValue } from "../../interpreter/utils";

export const OutputPortModal = () => {
  const dispatch = useDispatch();

  const showModal = useSelector(
    (state) => state.application.execute.showOutputPort
  );

  const outputPortValue = useSelector(
    (state) => state.application.execute.mainMemoryCells[255]
  );

  const [numericBase, setNumericBase] = useState(numericBaseType.BINARY);

  const handleChange = (event) => {
    setNumericBase(event.target.value);
  };

  return (
    showModal && (
      <Modal
        title={"Puerto de salida"}
        msg={null}
        onClose={() => {
          dispatch(setShowOutputPort(false));
          setNumericBase(numericBaseType.BINARY);
        }}
      >
        <Container>
          <BodyContainer>
            <Text>El valor de salida es:</Text>
            <Text $highlight>{convertValue(outputPortValue, numericBase)}</Text>
            <Line />
            <RadioGroup>
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
            </RadioGroup>
          </BodyContainer>
        </Container>
      </Modal>
    )
  );
};
