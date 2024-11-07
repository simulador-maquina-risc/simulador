import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Title,
} from "./styled";

import { convertValue } from "../../interpreter/utils";

const InputOutput = () => {
  const mainMemoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );
  const numericBase = useSelector((state) => state.application.numericBase);

  const [inputCell, setInputCell] = useState("");
  const [outputCell, setOutputCell] = useState("");

  useEffect(() => {
    const len = mainMemoryCells.length;
    setInputCell(mainMemoryCells[len - 2]);
    setOutputCell(mainMemoryCells[len - 1]);
  }, [mainMemoryCells]);

  const inputToShow = useMemo(() => {
    return convertValue(inputCell, numericBase);
  }, [inputCell, numericBase]);

  const outputToShow = useMemo(() => {
    return convertValue(outputCell, numericBase);
  }, [outputCell, numericBase]);

  return (
    <Container>
      <TableRow>
        <Title>Entrada (FE)</Title>
        <TableCell>{inputToShow}</TableCell>
      </TableRow>
      <TableRow>
        <Title>Salida (FF)</Title>
        <TableCell>{outputToShow}</TableCell>
      </TableRow>
    </Container>
  );
};

export default InputOutput;
