import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#6B7280", // Gray
    "#FACC15", // Yellow
    "#64748B", // Slate
    "#3B82F6", // Blue (duplicate)
    "#6B7280", // Grey (duplicate)
    "#FACC15", // Yellow (duplicate)
  ],
  inputValue: "Product Name",
};

export const colorPalletSlice = createSlice({
  name: "color_pallet",
  initialState,
  reducers: {
    updateInput: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateInput } = colorPalletSlice.actions;

export default colorPalletSlice.reducer;
