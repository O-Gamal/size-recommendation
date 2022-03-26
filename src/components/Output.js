import React, { useState } from "react";



function Output(props) {

  console.log(props.size)
  return (
    <div className="flex flex-col items-center justify-center w-50 border-l-4">
      <div className="text-blue-500 m-3 text-3xl font-bold">Your size is:</div>
      {props.size === 'undefined'? <p className="text-center">No data.<br/>Please, enter your body measurements in the form</p> : <div className="text-blue-500 text-3xl text-center w-3/4">{props.size}</div>}
      
    </div>
  );
}

export default Output;
