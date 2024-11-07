import Instruction from "../Instruction";
import { registersControlUnitId } from "../../containers/SimulatorSection/components";
import { toHexa } from "../utils";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class CopyRegisterToRegister extends Instruction {
  constructor(type, sourceRegister, destinationRegister, id) {
    super(type, id);
    this.sourceRegister = sourceRegister;
    this.destinationRegister = destinationRegister;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    // const { registers } = newExecuteState;
    const value = newExecuteState.registers[this.sourceRegister];
    newExecuteState.registers[this.destinationRegister] = value;
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = [
      { id: registersControlUnitId, reverse: true },
    ];
    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return [
      ["Opcode: ", "4 (Copiar registro)"],
      ["Origen: ", "Registro " + toHexa(this.sourceRegister)],
      ["Destino: ", "Registro " + toHexa(this.destinationRegister)],
    ];
  }
}
