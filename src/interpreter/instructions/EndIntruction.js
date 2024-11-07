import Instruction from "../Instruction";

/*

Instruction: b
Jumps to the instruction at address XY if the content of register R is equal to the content of register 0

*/

export default class End extends Instruction {
  constructor(type, instruction, id) {
    super(type, id);
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.endProgram = true;
    newExecuteState.edgeAnimation = [];
    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return [["Opcode: ", "C (Fin)"]];
  }
}
