import React, { useState } from "react";
import Two from 'two.js';

function Output(props) {
  return (
    <div className="flex flex-auto flex-col items-center justify-center w-40">
      <div className="text-blue-500 m-3 text-3xl font-bold">Your size is:</div>
      <div className="text-blue-500 text-5xl uppercase ">{props.size}</div>
     
    </div>
  );
}

export default Output;