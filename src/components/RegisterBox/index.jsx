import { React, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  MainContainer,
  CustomHandle,
  RegisterContainer,
  TitleContainer,
  RegistersContainer,
  TitleText,
  RegisterNumeration,
  RegisterValue,
} from "./styled.jsx";
import { registersId } from "../../containers/SimulatorSection/components.jsx";
import { convertValue } from "../../interpreter/utils";

export const RegisterBox = ({ id, data }) => {
  const registers = useSelector((state) => state.application.execute.registers);
  const numericBase = useSelector((state) => state.application.numericBase);
  const registersToShow = useMemo(() => {
    return registers?.map((value) => convertValue(value, numericBase));
  }, [numericBase, registers]);

  return (
    <>
      <MainContainer id={registersId}>
        <TitleContainer>
          <TitleText>Registros</TitleText>
        </TitleContainer>
        <RegistersContainer>
          {registersToShow.map((value, i) => (
            <RegisterContainer key={i}>
              <RegisterNumeration>{i.toString(16).toUpperCase()}</RegisterNumeration>
              <RegisterValue>{value}</RegisterValue>
            </RegisterContainer>
          ))}
        </RegistersContainer>
      </MainContainer>
      <CustomHandle
        type="target"
        position="right"
        style={{ background: "#555" }}
      />
      <CustomHandle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
      />
    </>
  );
};
