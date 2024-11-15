import {
  aluRegistersId,
  registerAluBottomId,
  registerAluTopId,
  controlUnitMainMemAddrId,
  // controlUnitMainMemDataId,
  mainMemControlUnitDataId,
  controlUnitCacheId,
  controlUnitCacheAddrBusId,
} from "../containers/SimulatorSection/components";

// Data Tranfer Instructions
export const LOAD_REGISTER_FROM_MEM = "1";
export const LOAD_REGISTER_FROM_PATTERN = "2";
export const STORE_MEM_FROM_REGISTER = "3";
export const COPY_REGISTER_TO_REGISTER = "4";

export const DataTransferInstructions = [
  LOAD_REGISTER_FROM_MEM,
  LOAD_REGISTER_FROM_PATTERN,
  STORE_MEM_FROM_REGISTER,
  COPY_REGISTER_TO_REGISTER,
];

// Arithmetic and Logic instructions
export const ADDITION_TWO_COMPLEMENT = "5";
export const FLOATING_POINT_SUM = "6";
export const OR = "7";
export const AND = "8";
export const XOR = "9";
export const ROTATE_RIGHT = "a";

export const AlInstructions = [
  ADDITION_TWO_COMPLEMENT,
  FLOATING_POINT_SUM,
  OR,
  AND,
  XOR,
  ROTATE_RIGHT,
];

// Control Instructions
export const JUMP_TO = "b";
export const END = "c";

export const ControlInstructions = [JUMP_TO, END];

export const typeSimulations = {
  SIMPLE: "simple",
  CYCLES: "cycles",
  PIPELINING: "pipelining",
};

export const cyclesSimulations = {
  FETCH: "Fetch",
  DECODE: "Decode",
  EXECUTE: "Execute",
};

export const numericBaseType = {
  BINARY: "binary",
  HEXA: "hexadecimal",
  DECIMAL: "decimal",
};

export const instructionCodes = [
  LOAD_REGISTER_FROM_MEM,
  LOAD_REGISTER_FROM_PATTERN,
  STORE_MEM_FROM_REGISTER,
  COPY_REGISTER_TO_REGISTER,
  ADDITION_TWO_COMPLEMENT,
  FLOATING_POINT_SUM,
  OR,
  AND,
  XOR,
  ROTATE_RIGHT,
  JUMP_TO,
  END,
];

export const operationNames = {
  [ADDITION_TWO_COMPLEMENT]: "Suma en complemento a 2",
  [FLOATING_POINT_SUM]: "Suma en punto flotante",
  [OR]: "OR",
  [AND]: "AND",
  [XOR]: "XOR",
  [ROTATE_RIGHT]: "Rotar a la derecha",
};

export const CACHE_SIZE = 16;

// export const animationsFetch = [
//   { id: controlUnitMainMemAddrId },
//   { id: mainMemControlUnitDataId, reverse: false, data: "" },
//   { id: controlUnitCacheId, reverse: false, data: "" },
//   { id: controlUnitCacheAddrBusId },
// ];

export const animationsAlu = [
  registerAluTopId,
  registerAluBottomId,
  aluRegistersId,
];

export const INVALID_END_ERROR =
  "La instrucción C000 debe ser la ultima en ser ejecutada.";

export const INFINITE_LOOP_ERROR =
  "El programa ha entrado en un bucle infinito.";
