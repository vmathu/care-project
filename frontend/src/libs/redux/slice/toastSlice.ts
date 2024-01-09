import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { toastProps } from "../interface";

const defaultToast: toastProps = {
  open: false,
  message: "",
  title: "",
  type: "success",
};

export const toast = createSlice({
  name: "toast",
  initialState: defaultToast,
  reducers: {
    setToast: (state, action: PayloadAction<Partial<toastProps>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setToast } = toast.actions;
export default toast.reducer;
