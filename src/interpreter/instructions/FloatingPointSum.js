import Instruction from "../Instruction";
import { animationsAlu } from "../constants";
import { applyBinaryOperation, toHexa, animationsAluData } from "../utils";
import { initialState } from "../../slices/applicationSlice";

/* 
Instruction: 6
Floating-point addition of the contents of registers S and T and store the result in register R.
*/

export default class FloatingPointSum extends Instruction {
  constructor(type, registerSIndex, registerTIndex, register, id) {
    super(type, id);
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = register;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = animationsAlu;

    const resultNewExecuteState = applyBinaryOperation(
      this,
      floatingPointSum,
      newExecuteState
    );

    if (resultNewExecuteState.registers[this.destinationIndex] === null) {
      resultNewExecuteState.showOverflowErrorModal = true;
      resultNewExecuteState.errorLine = this.id;
      const newExecute = {
        ...initialState.execute,
        showOverflowErrorModal: true,
        errorLine: this.id,
      };
      return {
        ...oldState,
        execute: newExecute,
      };
    }

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
      ["Opcode: ", "6 (Suma punto flotante)"],
      ["Operando 1: ", "Registro " + toHexa(this.registerSIndex)],
      ["Operando 2: ", "Registro " + toHexa(this.registerTIndex)],
      ["Destino: ", "Registro " + toHexa(this.destinationIndex)],
    ];
  }
}

export function floatingPointSum(registerS, registerT) {
  const parsedS = parseRegister(registerS);
  const parsedT = parseRegister(registerT);

  let resultSign = parsedS.sign;

  let alignedRegisters = alignMantissas(parsedS, parsedT);

  let diffSigns = parsedS.sign !== parsedT.sign;

  if (diffSigns) {
    if (alignedRegisters.register2.sign === 1) {
      alignedRegisters.register2.mantissa.implied = twosComplementMantissa(
        alignedRegisters.register2.mantissa.implied
      );
    } else {
      alignedRegisters.register1.mantissa.implied = twosComplementMantissa(
        alignedRegisters.register1.mantissa.implied
      );
    }
  }

  let resultMantissa = addBinary(
    alignedRegisters.register1.mantissa.implied,
    alignedRegisters.register2.mantissa.implied
  );

  if (diffSigns) {
    if (hasCarry(resultMantissa)) {
      resultSign = "0";
      resultMantissa = resultMantissa.slice(1);
    } else {
      resultSign = "1";
      resultMantissa = twosComplementMantissa(resultMantissa);
    }
  }

  const [normalizedMantissa, placesMoved] = normalizeMantissa(resultMantissa);

  const resultExponentInt =
    alignedRegisters.register1.exponent.decimal - placesMoved;

  if (resultExponentInt < -3) {
    // Underflow
    return "00000000";
  } else if (resultExponentInt > 4) {
    return null;
  }

  const resultExponent = toBiasBinary(resultExponentInt, 3, 3);

  const resultNormalizedMantissa = normalizedMantissa
    .split(".")[1]
    .substring(0, 4);

  if (resultNormalizedMantissa === "0000") {
    return resultSign + "0000000";
  }

  const res_string = resultSign + resultExponent + resultNormalizedMantissa;

  return res_string;
}

/*
Exponente sesgado:
000	-3
001	-2
010	-1
011	 0
100	 1
101	 2
110	 3
111	 4
*/

export function parseRegister(register) {
  const sign = parseInt(register[0], 2);

  const exponentStr = register.slice(1, 4);
  const exponentDecimal = parseInt(exponentStr, 2) - 3;

  const mantissa = register.slice(4, 8);
  const mantissaWithImpliedBit = `1.${mantissa}`;

  return {
    sign,
    exponent: {
      raw: exponentStr,
      decimal: exponentDecimal,
    },
    mantissa: {
      raw: mantissa,
      implied: mantissaWithImpliedBit,
    },
  };
}

function getResultExponent(register1, register2) {
  const exponent1 = register1.exponent.decimal;
  const exponent2 = register2.exponent.decimal;
  return Math.max(exponent1, exponent2);
}

export function alignMantissas(register1, register2) {
  const exp1 = register1.exponent.decimal;
  const exp2 = register2.exponent.decimal;

  if (exp1 === exp2) {
    return {
      register1,
      register2,
    };
  }

  const maxExponent = getResultExponent(register1, register2);
  const alignmentValue =
    exp1 !== maxExponent ? maxExponent - exp1 : maxExponent - exp2;

  const smallerExponentRegister = exp1 < exp2 ? register1 : register2;
  const biggerExponentRegister = exp1 > exp2 ? register1 : register2;
  const smallerMantissa = smallerExponentRegister.mantissa.implied;

  const alignedSmallerMantissa = movePoint(smallerMantissa, alignmentValue);

  const alignedMantissas = padBinaryStrings(
    alignedSmallerMantissa,
    biggerExponentRegister.mantissa.implied
  );

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  const newBiggerRegister = {
    ...deepClone(biggerExponentRegister),
    mantissa: {
      raw: biggerExponentRegister.mantissa.raw,
      implied: alignedMantissas[1],
    },
    sign: biggerExponentRegister.sign,
  };

  const newSmallerRegister = {
    ...deepClone(biggerExponentRegister),
    mantissa: {
      raw: smallerExponentRegister.mantissa.raw,
      implied: alignedMantissas[0],
    },
    sign: smallerExponentRegister.sign,
  };

  return {
    register1: newBiggerRegister,
    register2: newSmallerRegister,
  };
}

function movePoint(binaryString, n) {
  let [integerPart, fractionalPart] = binaryString.split(".");
  integerPart = "0".repeat(n) + integerPart;
  return integerPart.charAt(0) + "." + integerPart.slice(1) + fractionalPart;
}

function padBinaryStrings(str1, str2) {
  const [int1, frac1] = str1.split(".");
  const [int2, frac2] = str2.split(".");

  const maxIntLength = Math.max(int1.length, int2.length);
  const maxFracLength = Math.max(
    frac1 ? frac1.length : 0,
    frac2 ? frac2.length : 0
  );

  const paddedInt1 = int1.padStart(maxIntLength, "0");
  const paddedInt2 = int2.padStart(maxIntLength, "0");

  const paddedFrac1 = (frac1 || "").padEnd(maxFracLength, "0");
  const paddedFrac2 = (frac2 || "").padEnd(maxFracLength, "0");

  return [`${paddedInt1}.${paddedFrac1}`, `${paddedInt2}.${paddedFrac2}`];
}

export function addBinary(bin1, bin2) {
  const [intPart1, fracPart1] = bin1.split(".");
  const [intPart2, fracPart2] = bin2.split(".");

  const { result: fracSum, carry: fracCarry } = addBinaryFraction(
    fracPart1,
    fracPart2
  );

  const { result: intSum } = addBinaryInteger(intPart1, intPart2, fracCarry);

  return intSum + "." + fracSum;
}

function addBinaryFraction(frac1, frac2) {
  let carry = 0;
  let result = "";

  for (let i = frac1.length - 1; i >= 0; i--) {
    const sum = parseInt(frac1[i], 2) + parseInt(frac2[i], 2) + carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
  }

  return { result, carry };
}

function addBinaryInteger(int1, int2, carry) {
  let result = "";

  for (let i = int1.length - 1; i >= 0; i--) {
    const sum = parseInt(int1[i], 2) + parseInt(int2[i], 2) + carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
  }

  if (carry) {
    result = "1" + result;
  }

  return { result };
}

function invertBinaryString(binaryStr) {
  return binaryStr
    .split("")
    .map((char) => (char === "0" ? "1" : char === "1" ? "0" : char))
    .join("");
}

export function hasCarry(str) {
  const dotIndex = str.indexOf(".");
  return dotIndex > 1;
}

export function twosComplementMantissa(register) {
  const inverted = invertBinaryString(register);
  const result = addBinary(inverted, prepareInvertedForAddBinary(inverted));
  return result;
}

function prepareInvertedForAddBinary(inverted) {
  let binaryZeros = inverted
    .split("")
    .map((char) => (char === "." ? "." : "0"))
    .join("");

  const lastZeroIndex = binaryZeros.lastIndexOf("0");
  if (lastZeroIndex !== -1) {
    binaryZeros =
      binaryZeros.substring(0, lastZeroIndex) +
      "1" +
      binaryZeros.substring(lastZeroIndex + 1);
  }

  return binaryZeros;
}

export function normalizeMantissa(binaryStr) {
  const firstOneIndex = binaryStr.indexOf("1");

  // If no '1' is found, return the default values
  if (firstOneIndex === -1) {
    return ["0.0000", 0];
  }

  const dotIndex = binaryStr.indexOf(".");
  let binaryWithoutDot = binaryStr.replace(".", "");

  // Remove leading zeros
  let trimmedBinary = binaryWithoutDot.replace(/^0+/, "");

  // Add the decimal point after the first digit
  let processedString =
    trimmedBinary.slice(0, 1) + "." + trimmedBinary.slice(1);

  // Calculate the displacement of the '.'
  const displacement =
    dotIndex < firstOneIndex
      ? firstOneIndex - dotIndex
      : firstOneIndex + 1 - dotIndex;

  // Adjust the decimal part to ensure it's 4 characters long
  let parts = processedString.split(".");
  if (parts.length === 2) {
    let decimalPart = parts[1];

    // Ensure the decimal part has exactly 4 characters
    decimalPart =
      decimalPart.length < 4
        ? decimalPart.padEnd(4, "0")
        : decimalPart.slice(0, 4);

    processedString = parts[0] + "." + decimalPart;
  }

  return [processedString, displacement];
}

export function toBiasBinary(value, bias, bitWidth) {
  const adjustedValue = parseInt(value) + bias;
  return adjustedValue.toString(2).padStart(bitWidth, "0");
}
