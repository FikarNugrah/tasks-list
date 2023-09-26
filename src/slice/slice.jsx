import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  count1: 0,
  count2: 0,
  equal: 0,
  showGet: false,
  tasks: [],
  status: "idle",
  error: null,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment1: (state) => {
      state.count1 += 1;
    },
    decrement1: (state) => {
      if (state.count1 > 0) {
        state.count1 -= 1;
      }
    },
    increment2: (state) => {
      state.count2 += 1;
    },
    decrement2: (state) => {
      if (state.count2 > 0) {
        state.count2 -= 1;
      }
    },
    setEqual: (state) => {
      state.equal = state.count1 + state.count2;
      state.showGet = true;
    },
  },
});

export const { increment1, decrement1, increment2, decrement2, setEqual } =
  counterSlice.actions;

export default counterSlice.reducer;
