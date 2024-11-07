import React from "react";
import instructionsImg from "../../assets/instructions.png";
import {
  ModalBg,
  ModalBoxSetup,
  ModalWrapper,
  ModalContainer,
  Title,
  IconContainer,
  TableContainer,
  TableHeader,
  TableBody,
  TableBodyRow,
  TableData,
  TableHeaderRow,
  TableHeaderCell,
  ScrollableContainer,
  OperatingContainer,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { setOpenInstructionsModal } from "../../slices/modalsSlice";
import {
  instructions,
  operators,
} from "../../interpreter/instruction_descriptor";

export const InstructionsModal = () => {
  const show = useSelector((state) => state.modals.instructionsModal);
  const dispatch = useDispatch();

  return (
    show && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <Title>
              Instrucciones
              <IconContainer
                onClick={() => dispatch(setOpenInstructionsModal(false))}
              />
            </Title>
            <ScrollableContainer>
              <TableContainer>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHeaderCell>Código</TableHeaderCell>
                    <TableHeaderCell>Operandos</TableHeaderCell>
                    <TableHeaderCell>Descripción</TableHeaderCell>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(instructions).map(([key, value], index) => (
                    <TableBodyRow key={key}>
                      <TableData>{key}</TableData>

                      <TableData>
                        <OperatingContainer>
                          {operators[index]}
                        </OperatingContainer>
                      </TableData>

                      <TableData>{value[0]}</TableData>
                    </TableBodyRow>
                  ))}
                </TableBody>
              </TableContainer>
            </ScrollableContainer>
          </ModalContainer>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
