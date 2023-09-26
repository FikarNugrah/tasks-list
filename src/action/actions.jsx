// // actions.js
// import {
//   increment1,
//   decrement1,
//   increment2,
//   decrement2,
//   setEqual,
// } from "../reducers/reducers";

// export const increment_1 = () => (dispatch) => {
//   dispatch(increment1());
// };

// export const decrement_1 = () => (dispatch) => {
//   dispatch(decrement1());
// };

// export const increment_2 = () => (dispatch) => {
//   dispatch(increment2());
// };

// export const decrement_2 = () => (dispatch) => {
//   dispatch(decrement2());
// };

// export const setEqual = () => (dispatch, getState) => {
//   const state = getState();
//   const result = state.counter.count1 + state.counter.count2;

//   // Mengirim hasil equal sebagai payload yang serializable
//   dispatch({ type: "counter/setEqual", payload: result });
// };
