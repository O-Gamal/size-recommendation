import React, { useState } from "react";
import Output from './components/Output';
import Input from './components/Input';

function App() {

  const [sizeLabel, setSizeLabel] = useState("")
  const handleCallback = (data) =>{
    setSizeLabel(data)
  }
  return (
    <div className="flex fixed p-0 m-0 w-full h-full bg-gray-100">
      <Input parentCallback = {handleCallback}/>
      <Output size={sizeLabel} />
    </div>
  );
}

export default App;
