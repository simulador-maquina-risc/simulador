import { FaCircle } from "react-icons/fa6";
import { cyclesSimulations } from "../../interpreter/constants";
import { PipeliningCycle, FetchPipeliningCycle, Cycle } from "./styled";

const whiteColor = "var(--im-white)";

const getCurrentCycle = (cyclesIds) => {
  if (cyclesIds[0] !== null) return cyclesSimulations.FETCH;
  if (cyclesIds[1] !== null) return cyclesSimulations.DECODE;
  if (cyclesIds[2] !== null) return cyclesSimulations.EXECUTE;
  return "";
};

const getCurrentInstruction = (cyclesIds, instructions) => {
  if (getCurrentCycle(cyclesIds) == cyclesSimulations.FETCH) {
    return instructions[0];
  }
  if (getCurrentCycle(cyclesIds) == cyclesSimulations.DECODE) {
    return instructions[1];
  }
  if (getCurrentCycle(cyclesIds) == cyclesSimulations.EXECUTE) {
    return instructions[2];
  }
};

const getCycleColor = (cyclesIds, colors) => {
  if (getCurrentCycle(cyclesIds) == cyclesSimulations.FETCH) {
    return colors[0];
  }
  if (getCurrentCycle(cyclesIds) == cyclesSimulations.DECODE) {
    return colors[1];
  }
  if (getCurrentCycle(cyclesIds) == cyclesSimulations.EXECUTE) {
    return colors[2];
  }
  return "var(--im-white)";
};

const invalidInstruction = (instruction) => {
  return instruction === null || instruction.length != 4;
};

export const fetchReference = (fetchInstruction, fetchColor) => {
  const description = invalidInstruction(fetchInstruction) ? "-" : fetchInstruction + " (Fetch)";
  return (
    <>
      <FetchPipeliningCycle>
        {description}
      </FetchPipeliningCycle>
      <FaCircle color={fetchInstruction != "-" ? fetchColor : ""} />
    </>
  );
};

export const decodeReference = (decodeInstruction, decodeColor) => {
  const description = invalidInstruction(decodeInstruction)
    ? "-"
    : decodeInstruction + " (Decode)";
  const color = invalidInstruction(decodeInstruction)
    ? whiteColor
    : decodeColor;
  return (
    <>
      <PipeliningCycle>{description}</PipeliningCycle>
      <FaCircle color={color} />
    </>
  );
};

export const executeReference = (executeInstruction, executeColor) => {
  const description = invalidInstruction(executeInstruction)
    ? "-"
    : executeInstruction + " (Execute)";
  const color = invalidInstruction(executeInstruction)
    ? whiteColor
    : executeColor;
  return (
    <>
      <PipeliningCycle>{description}</PipeliningCycle>
      <FaCircle color={color} />
    </>
  );
};

export const cycleReference = (cyclesIds, instructions, colors) => {
  return (
    <>
      <Cycle>
        {getCurrentInstruction(cyclesIds, instructions) +
          " (" +
          getCurrentCycle(cyclesIds) +
          ")"}
      </Cycle>
      <FaCircle color={getCycleColor(cyclesIds, colors)} />
    </>
  );
};
