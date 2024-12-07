import { cyclesSimulations, typeSimulations, END } from "./constants";
import { splitCode, validateSyntax } from "./main";
import { InstructionFactory } from "./InstructionFactory";
import { combineCaches } from "./utils";

export default class Program {
  constructor(program, typeSimulation) {
    this.program = program;
    this.typeSimulation = typeSimulation;
    if (!validateSyntax(program).isValid) {
      return;
    }
    this.instructions = this.createInstructions();
  }

  createInstructions() {
    const instructions = splitCode(this.program)
      .filter((row) => row.length > 0)
      .map((row) => row.toLowerCase());
    return instructions.map((instruction, id) => {
      return InstructionFactory.createInstruction(instruction, id);
    });
  }

  /*  This method gets the current instruction id, depending on
      the current state of the program. If the fetch instruction id
      is not null, it means that the last cycle to be executed was
      the fetch cycle, so the current instruction id is the fetch
      instruction id and is going to execute the decode cycle.
      The same logic applies to the decode and execute (for the execute, 
      the instruction id is going to be the decode instruction id).
  */
  getCurrentInstructionId(state) {
    if (state.fetch.instructionId !== null) {
      return state.fetch.instructionId;
    } else if (state.decode.instructionId !== null) {
      return state.decode.instructionId;
    }
    return state.execute.instructionId || 0;
  }

  // Checks if last instruction is 'C000'.
  // Also checks if 'C000' is not in the
  // last line of the program.
  invalidEndInstruction() {
    const lastInstructionIndex = this.instructions.length - 1;
    for (let i = 0; i < lastInstructionIndex; i++) {
      if (this.instructions[i].type == END) {
        return true;
      }
    }
    return this.instructions[lastInstructionIndex].type != END;
  }

  isLastId(id) {
    return id >= this.instructions.length || id === null;
  }

  getNextValue(value, fallbackValue) {
    if (value == null) return fallbackValue;
    return value === -1 ? null : value + 1;
  }

  getNextColor(previousColor) {
    const colorMap = {
      "var(--im-pink)": "var(--im-green)",
      "var(--im-green)": "var(--im-blue)",
      "var(--im-blue)": "var(--im-yellow)",
      "var(--im-yellow)": "var(--im-pink)",
    };
    return colorMap[previousColor] || "var(--im-blue)";
  }

  getNewStatePipelining(oldState) {
    let newFetchState = oldState;
    let newDecodeState = oldState;
    let newExecuteState = oldState;

    let fetchInstructionId = this.getNextValue(
      oldState.fetch.instructionId,
      oldState.execute.instructionId || 0
    );
    let decodeInstructionId = this.getNextValue(
      oldState.decode.instructionId,
      oldState.fetch.instructionId
    );
    let executeInstructionId = this.getNextValue(
      oldState.execute.instructionId,
      oldState.decode.instructionId
    );

    if (!this.isLastId(executeInstructionId)) {
      const instructionExecute = this.instructions[executeInstructionId];
      newExecuteState = instructionExecute.nextStep(
        oldState,
        this.typeSimulation,
        cyclesSimulations.EXECUTE
      );
    }
    if (!this.isLastId(fetchInstructionId)) {
      const instructionFetch = this.instructions[fetchInstructionId];
      newFetchState = instructionFetch.nextStep(
        oldState,
        this.typeSimulation,
        cyclesSimulations.FETCH
      );
    } else {
      newFetchState = {
        ...oldState,
        fetch: {
          ...oldState.fetch,
          instructionId:
            fetchInstructionId >= this.instructions.length
              ? -1
              : fetchInstructionId,
          instructionRegister: "-",
          address: null,
          edgeAnimation: [],
        },
      };
    }
    if (
      !this.isLastId(decodeInstructionId) &&
      executeInstructionId !== this.instructions.length - 1
    ) {
      const intructionDecode = this.instructions[decodeInstructionId];
      newDecodeState = intructionDecode.nextStep(
        oldState,
        this.typeSimulation,
        cyclesSimulations.DECODE
      );
    } else {
      newDecodeState = {
        ...oldState,
        decode: {
          ...oldState.decode,
          instructionId: null,
          instructionRegister: "",
        },
      };
    }

    const newCacheMemoryCells = combineCaches(
      newExecuteState.execute.cacheMemoryCells,
      newFetchState.execute.cacheMemoryCells
    );

    return {
      ...oldState,
      fetch: {
        ...newFetchState.fetch,
        color: this.getNextColor(oldState.fetch.color),
      },
      decode: { ...newDecodeState.decode, color: oldState.fetch.color },
      execute: {
        ...newExecuteState.execute,
        instructionId: executeInstructionId,
        color: oldState.decode.color,
        cacheMemoryCells: newCacheMemoryCells,
      },
    };
  }

  getNewState(oldState) {
    if (this.typeSimulation == typeSimulations.PIPELINING) {
      return this.getNewStatePipelining(oldState);
    }
    const actualInstruction =
      this.instructions[this.getCurrentInstructionId(oldState)];

    const newState = actualInstruction.nextStep(oldState, this.typeSimulation);
    return newState;
  }

  makeJumpBranch(oldState, idBranch) {
    const actualInstruction = this.instructions[idBranch];
    this.instructions.forEach((instruction, index) => {
      if (index > idBranch) {
        instruction.resetCycle();
      }
    });
    const newState = actualInstruction.makeJump(oldState, this.typeSimulation);
    if (
      newState.execute.instructionId > this.instructions.length - 1 ||
      newState.execute.instructionId % 1 !== 0
    ) {
      newState.execute.errorLine = idBranch;
    }
    return newState;
  }
}
