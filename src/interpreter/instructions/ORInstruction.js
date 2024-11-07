import Instruction from "../Instruction";
import { animationsAluData, applyBinaryOperation, toHexa } from "../utils";
/* 

Instruction: 7
OR Operation

*/

export default class ORInstruction extends Instruction {
  constructor(type, registerSIndex, registerTIndex, destinationIndex, id) {
    super(type, id);
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id + 1;
    const resultNewExecuteState = applyBinaryOperation(
      this,
      (a, b) => parseInt(a, 2) | parseInt(b, 2),
      newExecuteState
    );

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
      ["Opcode: ", "7 (Disyunción)"],
      ["Operando 1: ", "Registro " + toHexa(this.registerSIndex)],
      ["Operando 2: ", "Registro " + toHexa(this.registerTIndex)],
      ["Destino: ", "Registro " + toHexa(this.destinationIndex)],
    ];
  }
}
