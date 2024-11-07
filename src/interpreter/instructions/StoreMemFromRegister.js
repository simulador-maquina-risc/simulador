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
Instruction: 3
Store the content of register R in the memory cell with address XY
*/

export default class StoreMemFromRegister extends Instruction {
  constructor(type, register, memoryCell, id) {
    super(type, id);
    this.register = register;
    this.memoryCell = memoryCell;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    const { registers } = newExecuteState;
    newExecuteState.mainMemoryCells = [...oldState.execute.mainMemoryCells];
    const value = registers[this.register];
    newExecuteState.mainMemoryCells[this.memoryCell] = value;
    newExecuteState.cacheMemoryCells = updateCache(
      newExecuteState,
      this.memoryCell
    );
    newExecuteState.instructionId = this.id + 1;

    //CACHE MEMORY ANIMATIONS
    const oldLength = oldState.execute.cacheMemoryCells.filter(
      (e) => e !== null
    ).length;
    const newLength = newExecuteState.cacheMemoryCells.filter(
      (e) => e !== null
    ).length;

    // Cache memory has been updated, meaning the main memory bus should be animated
    // if (oldLength < newLength) {
    newExecuteState.edgeAnimation = [
      {
        id: registersControlUnitId,
        reverse: false,
        data: value,
        address: this.register,
      },
      { id: controlUnitCacheId, reverse: true, data: value },
      { id: controlUnitMainMemAddrId, address: this.memoryCell },
      { id: mainMemControlUnitDataId, reverse: true, data: value },
      { id: controlUnitCacheAddrBusId, address: this.memoryCell },
    ];

    //} else {
    // Cache memory has not been updated, meaning the main memory bus should not be animated
    //   newExecuteState.edgeAnimation = [
    //     {
    //       id: registersControlUnitId,
    //       reverse: true,
    //       data: value,
    //       address: this.register,
    //     },
    //     { id: controlUnitCacheId, reverse: false, data: value },
    //     { id: controlUnitCacheAddrBusId, address: this.memoryCell },
    //   ];
    // }

    if (this.memoryCell === 255) {
      newExecuteState.showOutputPort = true;
      return { ...oldState, execute: newExecuteState };
    }

    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return [
      ["Opcode: ", "3 (Almacenar en memoria)"],
      ["Origen: ", "Registro " + toHexa(this.register)],
      ["Destino: ", "Dirección " + toHexaPadStart(this.memoryCell)],
    ];
  }
}
