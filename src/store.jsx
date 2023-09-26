import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import tasksSliceReducer from "./slice/tasksSlice";
import counterSlice from "./slice/slice";
import tasksSliceReducerv2 from "./slice/tasksSlicev2";

const rootReducer = combineReducers({
  // tasks: tasksSliceReducer,
  tasks: tasksSliceReducerv2,
  another: counterSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
