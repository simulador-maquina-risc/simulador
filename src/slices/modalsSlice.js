import { createSlice } from "@reduxjs/toolkit";
import { INTRODUCTION } from "../components/Tutorial/constants.jsx";

const initialState = {
  error: false,
  errorMessage: "",
  aluZoom: false,
  controlUnitZoom: false,
  mainMemoryModal: false,
  instructionsModal: false,
  calculatorModal: false,
  tutorial: false,
  tutorialStep: INTRODUCTION,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = true;
      state.errorMessage = action.payload;
    },
    closeError(state) {
      state.error = false;
      state.errorMessage = "";
    },
    setOpenAluZoom(state, action) {
      state.aluZoom = action.payload;
    },
    setOpenMainMemoryModal(state, action) {
      state.mainMemoryModal = action.payload;
    },
    setOpenControlUnitZoom(state, action) {
      state.controlUnitZoom = action.payload;
    },
    setOpenInstructionsModal(state, action) {
      state.instructionsModal = action.payload;
    },
    setShowTutorial(state, action) {
      state.tutorial = action.payload;
      state.tutorialStep = INTRODUCTION;
    },
    setTutorialStep(state, action) {
      state.tutorialStep = action.payload;
    },
    setOpenCalculatorModal(state, action) {
      state.calculatorModal = action.payload;
    },
  },
});

export const {
  setError,
  closeError,
  setOpenAluZoom,
  setOpenMainMemoryModal,
  setOpenControlUnitZoom,
  setOpenInstructionsModal,
  setShowTutorial,
  setTutorialStep,
  setOpenCalculatorModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
