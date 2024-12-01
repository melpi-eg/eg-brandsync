import { configureStore } from "@reduxjs/toolkit";
import colorPalletReducer from "./colorPalletReducer";

export const store = configureStore({
  reducer: {
    color_pallet: colorPalletReducer,
  },
});
