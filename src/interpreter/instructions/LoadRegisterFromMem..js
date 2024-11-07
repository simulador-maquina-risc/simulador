import Instruction from "../Instruction";
import { updateCache, toHexa, toHexaPadStart } from "../utils";
import {
  registersControlUnitId,
  controlUnitCacheId,
  controlUnitCacheAddrBusId,
  controlUnitMainMemAddrId,
  mainMemControlUnitDataId,
} from "../../containers/SimulatorSection/components";

/* 

Instruction: 1
Load the content of the memory cell with address XY into register R

*/

export default class LoadRegisterFromMem extends Instruction {
  constructor(type, register, memoryAddress, id) {
    super(type, id);
    this.register = register;
    this.memoryAddress = memoryAddress;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    const { mainMemoryCells } = oldState.execute;
    if (this.memoryAddress === 254) {
      newExecuteState.showInputPort = true;
      newExecuteState.registerToUpdate = this.register;
      newExecuteState.instructionId = this.id + 1;
      return { ...oldState, execute: newExecuteState };
    }
    newExecuteState.cacheMemoryCells = updateCache(
      newExecuteState,
      this.memoryAddress
    );

    const value = mainMemoryCells[this.memoryAddress];

    newExecuteState.registers[this.register] = value;
    newExecuteState.instructionId = this.id + 1;

    //CACHE MEMORY ANIMATIONS
    const oldLength = oldState.execute.cacheMemoryCells.filter(
      (e) => e !== null
    ).length;
    const newLength = newExecuteState.cacheMemoryCells.filter(
      (e) => e !== null
    ).length;

    // Cache memory has been updated, meaning the main memory bus should be animated
    if (oldLength < newLength) {
      newExecuteState.edgeAnimation = [
        {
          id: registersControlUnitId,
          reverse: true,
          data: value,
          address: this.register,
        },
        { id: controlUnitCacheId, reverse: true, data: value },
        { id: controlUnitCacheAddrBusId, address: this.memoryAddress },
        { id: controlUnitMainMemAddrId, address: this.memoryAddress },
        { id: mainMemControlUnitDataId, reverse: false, data: value },
      ];
    } else {
      // Cache memory has not been updated, meaning the main memory bus should not be animated
      newExecuteState.edgeAnimation = [
        {
          id: registersControlUnitId,
          reverse: true,
          data: value,
          address: this.register,
        },
        { id: controlUnitCacheId, reverse: false, data: value },
        { id: controlUnitCacheAddrBusId, address: this.memoryAddress },
      ];
    }

    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return [
      ["Opcode: ", "1 (Cargar de memoria)"],
      ["Origen: ", "Dirección " + toHexaPadStart(this.memoryAddress)],
      ["Destino: ", "Registro " + toHexa(this.register)],
    ];
  }
}
