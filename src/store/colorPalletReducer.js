import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    "#A3F1D2",
    "#E8B7D5",
    "#C3A0F4",
    "#F6A927",
    "#9D76E4",
    "#F3B762",
    "#D56F3B",
    "#C8A9E3",
    "#2B9F8C",
    "#4F6F2A",
    "#1E9D67",
    "#D3E62F",
  ],
  inputValue: "Product Name",
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
  },
});

// Action creators are generated for each case reducer function
export const { updateInput, updateSelectedIndex } = colorPalletSlice.actions;

export default colorPalletSlice.reducer;
