import React, { useState } from "react";
import "./counter.css";

const Counter = () => {
  const [value, setValue] = useState(1);

  /* increment of value by 1. the value is added 
  by 1 until the value becomes 10. 10 is assumed value of the maximum available Unit
  because the data of available unit not present in Data */

  const increment = () => {
    if (value < 10) {
      let result = value + 1;
      setValue(result);
    }
  };

  /* Decrement of value by 1. the value is subtract 
  by 1 until the value becomes 1. and 1 is set to minimum value of unit for buy and sell*/

  const decrement = () => {
    if (value > 1) {
      let result = value - 1;
      setValue(result);
    }
  };

  return (
    <>
      <button className="button" onClick={increment}>
        +1
      </button>
      <h3 className="heading">{value}</h3>
      <button className="button" onClick={decrement}>
        -1
      </button>
    </>
  );
};

export default Counter;
