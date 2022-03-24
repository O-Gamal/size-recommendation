import React, {useState} from 'react';
import Slider from '@mui/material/Slider';

const marks = [
    {
      value: 1,
      label: 'Tight',
    },
    {
      value: 2,
      label: 'Slightly Tight',
    },
    {
      value: 3,
      label: 'Average',
    },
    {
      value: 4,
      label: 'Slightly Loose',
    },
    {
        value: 5,
        label: 'Loose',
    },
];

function valuetext(val) {
    return `${marks[val-1].label}°C`;
}


function Input() {
  return (
    <div className="flex-auto w-60 flex flex-col p-12">
        <h1 className='text-center text-blue-500 uppercase align-top font-bold text-2xl m-5'>Size Recommendation</h1>
        <form id ='measurements' className='my-12grid grid-cols-2 gap-5'>            
            <input className='input-filed' type="text" id="height" placeholder="Height" required />
            <input className='input-filed' type="text" id="chest" placeholder="Chest" required />
            <input className='input-filed' type="text" id="waits" placeholder="Waist" required />
            <input className='input-filed' type="text" id="hips" placeholder="Hips" required />
            <input className='input-filed' type="text" id="inseam" placeholder="Inseam" required />
            <input className='input-filed' type="text" id="neckline" placeholder="Neckline" required />
            <input className='input-filed' type="text" id="arm" placeholder="Arm length" />
            <select className='input-filed' id="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select className='input-filed' id="garment">
                <option value="T-shirt">T-shirt</option>
                <option value="Shirt">Shirt</option>
                <option value="Pants">Pants</option>
                <option value="Skirt">Skirt</option>
                <option value="Dress">Dress</option>
                <option value="Short">Short</option>
            </select>
            {/* <select className='input-filed' id="fit_preferences">
                <option value="Average">Average</option>
                <option value="Tight">Tight</option>
                <option value="Loose">Loose</option>
            </select> */}
        </form>
        <Slider
            aria-label="Fit Preferences"
            defaultValue={3}
            getAriaValueText={valuetext}
            
            step={1}
            marks = {marks}
            min={1}
            max={5}
        />  

        
        <button className="my-20 text-white font-semibold block w-full py-2 bg-blue-500 rounded-md text-m shadow-lg focus:outline-none hover:bg-gray-100 hover:ring-2 hover:ring-blue-500 hover:text-blue-500" type="submit" form="measurements">Show Fit</button> 
    </div>
  );
}

export default Input;
