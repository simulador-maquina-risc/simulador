import { typeSimulations } from "../constants";
import Instruction from "../Instruction";
import { animationsAluData, toBinary, toHexa } from "../utils";
/*

Instruction: b
Jumps to the instruction at address XY if the content of register R is equal to the content of register 0
*/

export default class Branch extends Instruction {
  constructor(type, instruction, id) {
    super(type, id);
    this.registerCompareId = parseInt(instruction[1], 16);
    this.nextInstructionDir = instruction[2] + instruction[3];
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    const newFetchState = { ...oldState.fetch };
    const { registers } = newExecuteState;
    const register0 = toBinary(registers[0]);
    const registerToCompare = toBinary(registers[this.registerCompareId]);
    newExecuteState.aluOperation = {
      operation: "EQUAL",
      registerS: registers[0],
      registerT: registers[this.registerCompareId],
      registerSIndex: 0,
      registerTIndex: this.registerCompareId,
      destinationIndex: null,
      result: register0 == registerToCompare,
    };
    newExecuteState.edgeAnimation = animationsAluData(
      0,
      parseInt(register0, 2).toString(16),
      this.registerCompareId,
      parseInt(registerToCompare, 2).toString(16),
      null,
      null
    );

    if (register0 == registerToCompare) {
      newExecuteState.jumpInstruction = this.id;
      newExecuteState.instructionId = this.id + 1;
    } else {
      newExecuteState.instructionId = this.id + 1;
    }

    return { ...oldState, fetch: newFetchState, execute: newExecuteState };
  }

  makeJump(oldState, typeSimulation) {
    const newExecuteState = { ...oldState.execute };
    const newFetchState = { ...oldState.fetch };
    const newDecodeState = { ...oldState.decode };
    newExecuteState.instructionId = parseInt(this.nextInstructionDir, 16) / 2;
    newFetchState.programCounter = parseInt(this.nextInstructionDir, 16);
    newExecuteState.jumpInstruction = null;
    newExecuteState.aluOperation = null;
    if (typeSimulation === typeSimulations.PIPELINING) {
      newDecodeState.edgeAnimation = [];
      newExecuteState.edgeAnimation = [];
      newDecodeState.instructionRegister = "-";
      newDecodeState.instructionId = -1;
      newExecuteState.instructionId = -1;
      newFetchState.instructionId =
        parseInt(this.nextInstructionDir, 16) / 2 - 1;
    }
    return {
      ...oldState,
      fetch: newFetchState,
      execute: newExecuteState,
      decode: newDecodeState,
    };
  }

  toString() {
    return [
      ["Opcode: ", "B (Salto)"],
      ["Operando 1: ", "Registro " + this.registerCompareId],
      ["Operando 2: ", "Registro 0"],
      ["Dirección siguiente instrucción: ", this.nextInstructionDir],
    ];
  }
}
