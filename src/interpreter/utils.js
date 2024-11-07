import { operationNames, CACHE_SIZE, numericBaseType } from "./constants";
import {
  aluRegistersId,
  registerAluBottomId,
  registerAluTopId,
} from "../containers/SimulatorSection/components";

export function applyBinaryOperation(instruction, operation, actualState) {
  const newState = { ...actualState, registers: [...actualState.registers] };

  const registerS = toBinaryComplement(
    actualState.registers[instruction.registerSIndex]
  );

  const registerT = toBinaryComplement(
    actualState.registers[instruction.registerTIndex]
  );
  const operationResult = operation(registerS, registerT);
  if (operationResult === null) {
    newState.registers[instruction.destinationIndex] = null;
    return newState;
  }

  const paddedOperationResult = operationResult
    .toString(2)
    .slice(0, 8)
    .padStart(8, "0");

  const hexValue = parseInt(paddedOperationResult, 2)
    .toString(16)
    .toUpperCase();

  newState.aluOperation = {
    operation: operationNames[instruction.type],
    registerS: actualState.registers[instruction.registerSIndex],
    registerT: actualState.registers[instruction.registerTIndex],
    registerSIndex: instruction.registerSIndex,
    registerTIndex: instruction.registerTIndex,
    destinationIndex: instruction.destinationIndex,
    result: paddedOperationResult,
  };

  newState.registers[instruction.destinationIndex] = hexValue;
  return newState;
}

export function applyRotation(instruction, operation, actualState) {
  const newState = { ...actualState, registers: [...actualState.registers] };

  const register = toBinaryComplement(
    actualState.registers[instruction.register]
  );

  const rotations = instruction.rotations;

  const operationResult = operation(register, rotations).toString(2);

  const paddedOperationResult = operationResult.slice(0, 8).padStart(8, "0");

  const hexValue = parseInt(paddedOperationResult, 2)
    .toString(16)
    .toUpperCase();

  newState.aluOperation = {
    operation: operationNames[instruction.type],
    registerS: actualState.registers[instruction.register],
    registerT: rotations,
    registerSIndex: instruction.register,
    registerTIndex: instruction.register,
    destinationIndex: instruction.register,
    result: paddedOperationResult,
  };

  newState.registers[instruction.destinationIndex] = hexValue;
  return newState;
}

export function updateCache(oldExecuteState, memoryAddress) {
  const { cacheMemoryCells } = oldExecuteState;
  let newCacheMemoryCells = [...cacheMemoryCells];
  newCacheMemoryCells = cacheMemoryCells.filter((cell) =>
    cell ? cell.address !== memoryAddress : true
  );
  while (newCacheMemoryCells.length < CACHE_SIZE) {
    newCacheMemoryCells.push({
      [newCacheMemoryCells.length]: null,
    });
  }
  newCacheMemoryCells.pop();
  newCacheMemoryCells.unshift({
    address: memoryAddress,
    content: oldExecuteState.mainMemoryCells[memoryAddress],
  });

  return newCacheMemoryCells;
}

// Combines the two caches without duplicates
export function combineCaches(executeCache, fetchCache) {
  const newCacheMemoryCells = [...executeCache];
  fetchCache.forEach((cell) => {
    if (!cell) {
      return;
    }
    if (!newCacheMemoryCells.find((e) => e && e.address === cell.address)) {
      newCacheMemoryCells.pop();
      newCacheMemoryCells.unshift(cell);
    }
  });

  return newCacheMemoryCells;
}

export const animationsAluData = (
  registerRAddr,
  registerRData,
  registerTAddr,
  registerTData,
  registerDestIndex,
  registerDestData
) => {
  const aluData = [
    { id: registerAluTopId, address: registerRAddr, data: registerRData },
    {
      id: aluRegistersId,
      address: registerDestIndex,
      data: registerDestData,
    },
  ];

  if (registerTAddr) {
    aluData.push({
      id: registerAluBottomId,
      address: registerTAddr,
      data: registerTData,
    });
  }
  return aluData;
};

export function toHexa(value) {
  return value.toString(16).toUpperCase();
}

export function toHexaPadStart(value) {
  return value.toString(16).toUpperCase().padStart(2, "0");
}

export function toBinary(value) {
  return parseInt(value, 16).toString(2).toUpperCase().padStart(8, "0");
}

export function toBinaryComplement(value) {
  if (parseInt(value, 16) >= 0) {
    return toBinary(value);
  } else {
    const positiveBinary = Math.abs(parseInt(value, 16))
      .toString(2)
      .padStart(8, "0");
    const invertedBinary = positiveBinary
      .split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join("");
    const binaryComplement = (parseInt(invertedBinary, 2) + 1)
      .toString(2)
      .padStart(8, "0");
    return binaryComplement;
  }
}

export function convertValue(value, base) {
  if (value == null || value == "-" || value == "") {
    return "-";
  }
  if (base == numericBaseType.HEXA) {
    return toHexaPadStart(value);
  }
  if (base == numericBaseType.BINARY) {
    return toBinaryComplement(value);
  }
  return value;
}

const errorMessages = {
  empty: "El valor no puede estar vacío",
  outOfRange: "El valor debe estar entre -128 y 127",
  outOfRangeHexa: "El valor debe estar entre 0 y FF",
  containsLetters: "El valor no puede contener letras",
  invalidBinary: "El valor solo puede contener unos y ceros",
  invalidBitLength: "El valor debe tener exactamente 8 bits",
  invalidHex: "El valor debe estar en base hexadecimal y tener 1 o 2 dígitos",
  invalidValue: "Tipo de valor no válido",
};

const isValidBinary = (value) => {
  if (!/^[01]+$/.test(value)) {
    return errorMessages.invalidBinary;
  }
  if (value.length !== 8) {
    return errorMessages.invalidBitLength;
  }
  return null;
};

const isValidHex = (value) => {
  if (!/^[0-9A-Fa-f]+$/.test(value)) {
    return errorMessages.invalidHex;
  }
  const hexValue = parseInt(value, 16);
  if (hexValue < 0 || hexValue > 255) {
    return errorMessages.outOfRangeHexa;
  }
  return null;
};

export const inputHasError = (inputValue, numericBase) => {
  if (inputValue === "") {
    return errorMessages.empty;
  }
  switch (numericBase) {
    case numericBaseType.BINARY:
      return isValidBinary(inputValue);
    case numericBaseType.HEXA:
      return isValidHex(inputValue);
    default:
      return errorMessages.invalidValue;
  }
};
