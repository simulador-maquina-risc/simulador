import Instruction from "../Instruction";
import { animationsAluData, toHexa, applyRotation } from "../utils";
import { toBinary } from "../utils";
/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class RotateRight extends Instruction {
  constructor(type, register, rotations, id) {
    super(type, id);
    this.rotations = rotations;
    this.register = register;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    const registerValue = newExecuteState.registers[this.register];
    const binaryValue = toBinary(registerValue);
    let rotated = binaryValue;
    for (let i = 0; i < this.rotations; i++) {
      rotated =
        rotated[rotated.length - 1] + rotated.slice(0, rotated.length - 1);
    }
    rotated = parseInt(rotated, 2).toString(16);
    newExecuteState.registers[this.register] = rotated;
    newExecuteState.instructionId = this.id + 1;

    const resultNewExecuteState = applyRotation(
      this,
      (a, b) => rotateRight(a, b),
      newExecuteState
    );

    resultNewExecuteState.edgeAnimation = animationsAluData(
      this.rotations,
      resultNewExecuteState.registers[this.registerSIndex],
      this.register,
      this.rotations,
      this.register,
      resultNewExecuteState.registers[this.destinationIndex]
    );

    return {
      ...oldState,
      execute: resultNewExecuteState,
    };
  }

  // execute(oldState) {

  //   const newExecuteState = { ...oldState.state };
  //   const registerValue = newExecuteState.registers[this.register];
  //   const length = registerValue.length;
  //   const registerT = newExecuteState.registers[this.rotations];
  //   const shift = registerT;
  //   const rotations = shift % length;
  //   const extendedPattern = registerValue + registerValue;
  //   newExecuteState.registers[this.register] = extendedPattern.substring(
  //     length - rotations,
  //     2 * length - rotations
  //   );

  //   newExecuteState.instructionId = this.id + 1;
  //   newExecuteState.edgeAnimation = animationsAluData(
  //     this.register,
  //     registerValue,
  //     null,
  //     null,
  //     this.register,
  //     newExecuteState.registers[this.register]
  //   );

  //   return { ...oldState, execute: newExecuteState };
  // }

  toString() {
    return [
      ["Opcode: ", "A (Rotación)"],
      [
        "Operando 1: ",
        "Registro " + toHexa(this.register),
        ...(parseInt(this.rotations) == 1
          ? ["Rotación: " + this.rotations + " vez"]
          : ["Rotación: " + this.rotations + " veces"]),
      ],
      ["Operando 2: ", this.rotations],
    ];
  }
}

function rotateRight(binaryString, numRotations) {
  numRotations = numRotations % 8;
  return (
    binaryString.slice(-numRotations) + binaryString.slice(0, 8 - numRotations)
  );
}
