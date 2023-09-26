import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function GetState() {
  const count1 = useSelector((state) => state.count1);
  const count2 = useSelector((state) => state.count2);
  const equal = useSelector((state) => state.equal);

  return (
    <>
      <p>
        Hasil dari {count1} ditambah {count2} adalah {equal}
      </p>
    </>
  );
}
