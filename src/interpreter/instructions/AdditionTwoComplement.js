import { initialState } from "../../slices/applicationSlice";
import Instruction from "../Instruction";
import { animationsAlu } from "../constants";
import { toHexa, applyBinaryOperation, animationsAluData } from "../utils";

/* 

Instruction: 5
Copy the content of register R1 to register R2

*/

export default class AdditionTwoComplement extends Instruction {
  constructor(type, registerSIndex, registerTIndex, destinationIndex, id) {
    super(type, id);
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = animationsAlu;

    const resultNewExecuteState = applyBinaryOperation(
      this,
      additionTwoComplement,
      newExecuteState
    );
    if (resultNewExecuteState.registers[this.destinationIndex] === null) {
      resultNewExecuteState.showOverflowErrorModal = true;
      resultNewExecuteState.errorLine = this.id;
      const newExecute = {
        ...initialState.execute,
        showOverflowErrorModal: true,
        errorLine: this.id,
      };
      return {
        ...oldState,
        execute: newExecute,
      };
    }
    resultNewExecuteState.edgeAnimation = animationsAluData(
      this.registerSIndex,
      resultNewExecuteState.registers[this.registerSIndex],
      this.registerTIndex,
      resultNewExecuteState.registers[this.registerTIndex],
      this.destinationIndex,
      resultNewExecuteState.registers[this.destinationIndex]
    );
    return {
      ...oldState,
      execute: resultNewExecuteState,
    };
  }

  toString() {
    return [
      ["Opcode: ", "5 (Suma)"],
      ["Operando 1: ", "Registro " + toHexa(this.registerSIndex)],
      ["Operando 2: ", "Registro " + toHexa(this.registerTIndex)],
      ["Destino: ", "Registro " + toHexa(this.destinationIndex)],
    ];
  }
}

function additionTwoComplement(registerS, registerT) {
  const s = twosComplementToDecimal(registerS);
  const t = twosComplementToDecimal(registerT);
  const decimalResult = s + t;
  return decimalToTwosComplement(decimalResult);
}

function twosComplementToDecimal(binaryStr) {
  if (binaryStr[0] === "1") {
    return parseInt(binaryStr, 2) - 256;
  } else {
    return parseInt(binaryStr, 2);
  }
}

function decimalToTwosComplement(num) {
  if (num < -128 || num > 127) {
    return null;
  }

  // Convert the number to a binary string, and mask it to get the last 8 bits
  let binary = (num & 0xff).toString(2);

  // Pad the binary string with leading zeros to ensure it is 8 bits long
  return binary.padStart(8, "0");
}
