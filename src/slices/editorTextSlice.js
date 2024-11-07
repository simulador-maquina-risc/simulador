import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instruction: "",
  show: true,
  program: {},
};

export const editorTextSlice = createSlice({
  name: "editorText",
  initialState,
  reducers: {
    setNewInstruction: (state, action) => {
      state.instruction = action.payload;
    },
    setShowEditor: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setNewInstruction, setShowEditor } = editorTextSlice.actions;

export default editorTextSlice.reducer;
