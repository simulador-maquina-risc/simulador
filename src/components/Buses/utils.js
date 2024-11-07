import { typeSimulations } from "../../interpreter/constants";

export const textDataTitle = (title, typeSimulation) => {
  if (typeSimulation === typeSimulations.SIMPLE) {
    return "Datos";
  }
  return title;
};

export const textAddressTitle = (title, typeSimulation) => {
  if (typeSimulation === typeSimulations.SIMPLE) {
    return "Dirección";
  }
  return title;
};
