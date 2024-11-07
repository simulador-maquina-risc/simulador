import React, { useState, useEffect } from "react";
import { Container } from "./styled";
import { FaBackward, FaForward } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { splitCode } from "../../../interpreter/main";
import {
  goToPreviousState,
  updatePreviousState,
  updateCurrentState,
  clearApplication,
  setIsSimulating,
  goToFistState,
} from "../../../slices/applicationSlice";
import { Button } from "../../Button";
import Program from "../../../interpreter/Program";
import { setError } from "../../../slices/modalsSlice";
import { INVALID_END_ERROR } from "../../../interpreter/constants";
import { validateSyntax } from "../../../interpreter/main";
import { setErrorLine } from "../../../slices/applicationSlice";

export const TextEditorButtons = ({ text }) => {
  const [program, setProgram] = useState(null);
  const isSimulating = useSelector((state) => state.application.isSimulating);
  const dispatch = useDispatch();
  const applicationState = useSelector((state) => state.application);

  const getProgramInMemory = () => {
    const parsedCode = splitCode(text).join("");
    return Array.from(
      { length: 256 },
      (_, i) => parsedCode.slice(i * 2, i * 2 + 2).toUpperCase() || "-"
    );
  };

  const isCodeLengthValid = (code) => {
    const codeLength = splitCode(code).join("").length;
    if (codeLength > 508) {
      dispatch(
        setError("El código excede la cantidad de instrucciones permitidas.")
      );
      return false;
    }
    return true;
  };

  const isSyntaxValid = (code) => {
    if (!validateSyntax(code).isValid) {
      dispatch(setErrorLine(validateSyntax(code).errorLine));
      return false;
    }
    return true;
  };

  const isValidEndInstruction = (program) => {
    if (program.invalidEndInstruction()) {
      dispatch(setError(INVALID_END_ERROR));
      return false;
    }
    return true;
  };

  const simulateProgram = (program, memory) => {
    dispatch(setIsSimulating(!isSimulating));
    setProgram(program);

    const newState = program.getNewState({
      ...applicationState,
      fetch: {
        ...applicationState.fetch,
        programCounter: 0,
        instructionId: null,
      },
      execute: {
        ...applicationState.execute,
        mainMemoryCells: memory,
      },
    });
    if (newState.execute.errorLine) {
      dispatch(setIsSimulating(false));
    }
    dispatch(updateCurrentState(newState));
  };

  const handleSimulateButtonClick = () => {
    if (!isSyntaxValid(text)) return;
    if (!isCodeLengthValid(text)) return;
    dispatch(clearApplication());
    const newMemory = getProgramInMemory();
    const newProgram = new Program(text, applicationState.typeSimulations);
    if (newProgram.invalidEndInstruction()) {
      dispatch(setError(INVALID_END_ERROR));
      return;
    }
    if (!isValidEndInstruction(newProgram)) return;
    simulateProgram(newProgram, newMemory);
  };

  const handleEditCodeButtonClick = () => {
    dispatch(setIsSimulating(false));
    dispatch(clearApplication());
  };

  const setPrevLine = () => {
    dispatch(goToPreviousState());
  };

  const setNextLine = () => {
    if (applicationState.execute.endProgram) {
      dispatch(setIsSimulating(false));
      dispatch(clearApplication());
      return;
    }

    if (applicationState.execute.jumpInstruction) {
      const newState = program.makeJumpBranch(
        applicationState,
        applicationState.execute.jumpInstruction
      );
      dispatch(updatePreviousState());
      dispatch(updateCurrentState(program.getNewState(newState)));
      return;
    }
    const newState = program.getNewState(applicationState);
    if (newState.execute.errorLine) {
      dispatch(setIsSimulating(false));
    }
    dispatch(updatePreviousState());
    dispatch(updateCurrentState(newState));
  };

  const setLastLine = () => {
    let oldState = applicationState;
    while (
      !oldState.execute.endProgram &&
      !oldState.execute.showOutputPort &&
      !oldState.execute.showInputPort
    ) {
      const newState = program.getNewState(oldState);
      oldState = newState;

      if (oldState.execute.jumpInstruction) {
        const newStateBranch = program.makeJumpBranch(
          oldState,
          oldState.execute.jumpInstruction
        );
        const nextState = program.getNewState(newStateBranch);
        oldState = nextState;
        dispatch(updatePreviousState());
        dispatch(updateCurrentState(nextState));
        continue;
      }

      dispatch(updatePreviousState());
      dispatch(updateCurrentState(newState));
    }
  };

  const setFirstLine = () => {
    dispatch(goToFistState());
  };

  return (
    <Container>
      {isSimulating ? (
        <>
          <Button onClick={setFirstLine}>
            <FaBackward />
          </Button>
          <Button onClick={setPrevLine}>
            <BiSolidLeftArrow />
          </Button>
          <Button onClick={setNextLine}>
            <BiSolidRightArrow />
          </Button>
          <Button onClick={setLastLine}>
            <FaForward />
          </Button>
          <Button onClick={handleEditCodeButtonClick}> Editar</Button>
        </>
      ) : (
        <Button disabled={text.length == 0} onClick={handleSimulateButtonClick}>
          Simular
        </Button>
      )}
    </Container>
  );
};
