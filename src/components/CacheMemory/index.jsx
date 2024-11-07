import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { cacheMemoryId } from "../../containers/SimulatorSection/components";
import {
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableTitle,
  CustomHandle,
} from "./styled";
import { convertValue } from "../../interpreter/utils";

export const CacheMemory = () => {
  const cacheMemoryCells = useSelector(
    (state) => state.application.execute.cacheMemoryCells
  );
  const numericBase = useSelector((state) => state.application.numericBase);
  const cellsContentToShow = useMemo(() => {
    return cacheMemoryCells?.map((cell) =>
      convertValue(cell?.content, numericBase)
    );
  }, [numericBase, cacheMemoryCells]);

  return (
    <TableContainer id={cacheMemoryId}>
      <TableTitle>Memoria Caché</TableTitle>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Dirección</TableHeader>
            <TableHeader>Contenido</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {cacheMemoryCells.map((cell, index) => (
            <TableRow key={index} colSpan="2">
              <TableCell>
                {cell
                  ? parseInt(cell.address, 10).toString(16).padStart(2, "0").toUpperCase()
                  : "-"}
              </TableCell>
              <TableCell>{cellsContentToShow[index]}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <CustomHandle
        type="source"
        position="top"
        style={{ background: "#555" }}
      />
    </TableContainer>
  );
};
