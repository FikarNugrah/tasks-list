import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment1,
  decrement1,
  increment2,
  decrement2,
  setEqual,
} from "../slice/slice";
import GetState from "./getState";

const Counter = () => {
  //
  const showGet = useSelector((state) => state.showGet);
  const count1 = useSelector((state) => state.count1);
  const count2 = useSelector((state) => state.count2);
  const equal = useSelector((state) => state.equal);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex">
        <p>nilai 1: {count1}</p>
        <button onClick={() => dispatch(increment1())}>+</button>
        <button onClick={() => dispatch(decrement1())}>-</button>
      </div>
      <div className="flex">
        <p>nilai 2: {count2}</p>
        <button onClick={() => dispatch(increment2())}>+</button>
        <button onClick={() => dispatch(decrement2())}>-</button>
      </div>
      <div className="flex">
        <button onClick={() => dispatch(setEqual())}>equal</button>:
        <p>{equal}</p>
      </div>
      {showGet ? <GetState /> : <></>}
    </>
  );
};

export default Counter;
