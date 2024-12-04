import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    "#F68644",
    "#E1B120",
    "#A89C96",
    "#7D6D62",
    "#A2C093",
    "#77A781",
    "#44706A",
    "#95B6B9",
    "#395F6F",
  ],
  inputValue: "Product Name",
  inputSvg: "Product Name",
  selectedIndex: 3,
};

export const colorPalletSlice = createSlice({
  name: "color_pallet",
  initialState,
  reducers: {
    updateInput: (state, action) => {
      state.inputValue = action.payload;
    },
    updateSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    updateInputSvg: (state, action) => {
      state.inputSvg = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateInput, updateSelectedIndex, updateInputSvg } =
  colorPalletSlice.actions;

export default colorPalletSlice.reducer;
