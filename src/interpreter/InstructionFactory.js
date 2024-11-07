import * as constants from "./constants";
import AdditionTwoComplement from "./instructions/AdditionTwoComplement";
import ANDInstruction from "./instructions/ANDInstruction";
import Branch from "./instructions/Branch";
import CopyRegisterToRegister from "./instructions/CopyRegisterToRegister";
import End from "./instructions/EndIntruction";
import FloatingPointSum from "./instructions/FloatingPointSum";
import LoadRegisterFromMem from "./instructions/LoadRegisterFromMem.";
import LoadRegisterFromPattern from "./instructions/LoadRegisterFromPattern";
import ORInstruction from "./instructions/ORInstruction";
import RotateRight from "./instructions/RotateRight";
import StoreMemFromRegister from "./instructions/StoreMemFromRegister";
import XORInstruction from "./instructions/XORInstruction";

/*
    Class for Instructions
    This class is responsible for creating the correct instruction object
    based on the instruction type

*/

export class InstructionFactory {
  static createInstruction(instruction, id) {
    if(!instruction.length) return null;
    const type = instruction[0].toLowerCase();

    const register = parseInt(instruction[1], 16);
    const payload = parseInt(instruction[2] + instruction[3], 16);

    const registerDestination = parseInt(instruction[2], 16);
    const registerSource = parseInt(instruction[3], 16);

    const registerSIndex = parseInt(instruction[2], 16);
    const registerTIndex = parseInt(instruction[3], 16);

    switch (type) {
      case constants.COPY_REGISTER_TO_REGISTER: {
        return new CopyRegisterToRegister(
          type,
          registerDestination,
          registerSource,
          id
        );
      }
      case constants.LOAD_REGISTER_FROM_MEM: {
        return new LoadRegisterFromMem(type, register, payload, id);
      }
      case constants.LOAD_REGISTER_FROM_PATTERN: {
        // sin parsear, guardo todo como hexa
        return new LoadRegisterFromPattern(
          type,
          register,
          instruction[2] + instruction[3],
          id
        );
      }
      case constants.STORE_MEM_FROM_REGISTER: {
        return new StoreMemFromRegister(type, register, payload, id);
      }
      case constants.ADDITION_TWO_COMPLEMENT:
        return new AdditionTwoComplement(
          type,
          registerSIndex,
          registerTIndex,
          register,
          id
        );
      case constants.FLOATING_POINT_SUM:
        return new FloatingPointSum(
          type,
          registerSIndex,
          registerTIndex,
          register,
          id
        );
      case constants.ROTATE_RIGHT:
        return new RotateRight(type, register, registerTIndex, id);
      case constants.OR:
        return new ORInstruction(
          type,
          registerSIndex,
          registerTIndex,
          register,
          id
        );
      case constants.AND:
        return new ANDInstruction(
          type,
          registerSIndex,
          registerTIndex,
          register,
          id
        );
      case constants.XOR:
        return new XORInstruction(
          type,
          registerSIndex,
          registerTIndex,
          register,
          id
        );
      case constants.JUMP_TO:
        return new Branch(type, instruction, id);
      case constants.END:
        return new End(type, instruction, id);
    }
  }
}
