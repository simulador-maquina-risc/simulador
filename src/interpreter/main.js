// import { getStateAfterInstruction } from "./instructions.js";
import { instructionCodes } from "./constants.js";

export function validateSyntax(code) {
  let rows = splitCode(code).map((row) => row.toLowerCase());
  return isValidCode(rows);
}

export function splitCode(text) {
  return text.split(/\r?\n/).map((row) => {
    const trimmedRow = row.trim();
    const instruction = trimmedRow.match(/^[^\s\t\n]+/)?.[0] || "";
    return instruction;
  });
}

function isValidCode(rows) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (
      row.length > 0 &&
      (!validateLength(row) ||
        !validateInstructionCode(row) ||
        !validatePattern(row))
    ) {
      return { isValid: false, errorLine: i };
    }
  }
  return { isValid: true, errorLine: null };
}

function validateLength(row) {
  return row.length === 4;
}

function validateInstructionCode(row) {
  const rowSplit = row.split("");
  const instruction = rowSplit[0].toLowerCase();
  return instructionCodes.includes(instruction);
}

function validatePattern(row) {
  const rowSplit = row.split("").map((r) => r.toLowerCase());
  const instruccion = rowSplit[0];
  // pattern RXY o RST
  if (
    ["1", "2", "3", "5", "6", "7", "8", "9", "a", "b"].includes(instruccion)
  ) {
    return validateIfHexa(rowSplit[1])
      ? validateParameters(instruccion, row.slice(2, 4))
      : false;
  } else if (instruccion === "4") {
    return (
      rowSplit[1] === "0" &&
      validateIfHexa(rowSplit[2]) &&
      validateIfHexa(rowSplit[3])
    );
  } else if (instruccion === "c") {
    return row.slice(1, 4) === "000";
  }
  return true;
}

function validateParameters(instruccion, parameters) {
  if (["1", "2", "3", "5", "6", "7", "8", "9", "b"].includes(instruccion)) {
    return validateIfHexa(parameters[0]) && validateIfHexa(parameters[1]);
  } else if (instruccion === "a") {
    return parameters[0] === "0" && validateIfHexa(parameters[1]);
  }
  return false;
}

function validateIfHexa(register) {
  return [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ].includes(register);
}
