import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import sizechart from '../sizechart.json';
import KNN from 'ml-knn'  ;


const marks = [
  {
    value: 1,
    label: "Tight",
  },
  {
    value: 2,
    label: "Slightly Tight",
  },
  {
    value: 3,
    label: "Average",
  },
  {
    value: 4,
    label: "Slightly Loose",
  },
  {
    value: 5,
    label: "Loose",
  },
];

function valuetext(val) {
  return `${marks[val - 1].label}°C`;
}


const garmentsMale = ["Shirt", "T-shirt", "Jacket", "Blazer", "Pants"]
const garmentsFemale = ["Blouse", "Dress", "Jacket", "Pants", "Skirt"]
const topGarments = ["Blouse", "Shirt", "T-shirt", "Blazer", "Jacket", "Dress"]
const bottomGarments = ["Pants", "Skirt"]



function Input(props) {

  const [gender, setGender] = useState("Male");
  const [garment, setGarment] = useState("T-shirt");
  const [style, setStyle] = useState(3);
  const [height, setHeight] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [inseam, setInseam] = useState("");
  const [neckline, setNeckline] = useState("");
  const [armLength, setArmLenght] = useState("");
  const [size, setSize] = useState("");
  const userTopMeasurments = [height,chest,waist,neckline,armLength].map(e=>parseInt(e));
  const userBottomMeasurments = [waist,hips,inseam].map(e=>parseInt(e));

  const generateTrainDataSet = (type) => {
      if(type ==='tops'){
        const sizes = Object.keys(sizechart["H&M"][gender.toLowerCase()]['tops'])
        const topsSizes = []
        sizes.forEach(size => {
          topsSizes.push(Object.values(sizechart['H&M'][gender.toLowerCase()]['tops'][size]))
        });
      return topsSizes;
      }
      else if (type ==='bottoms'){
        const sizes = Object.keys(sizechart["H&M"][gender.toLowerCase()]['bottoms'])
        const bottomSizes = []
        sizes.forEach(size => {
          bottomSizes.push(Object.values(sizechart['H&M'][gender.toLowerCase()]['bottoms'][size]))
        });
      return bottomSizes;
      }
  }



  const onSubmit = (e) => {
    e.preventDefault()
    // const sizes = Object.keys(sizechart["H&M"][gender.toLowerCase()]['tops'])
    // const tops = sizechart["H&M"][gender.toLowerCase()]['tops']
    // const bottoms = sizechart["H&M"][gender.toLowerCase()]['bottoms']
    let styleControl
    if(style === 1) styleControl = -3
    else if(style === 2) styleControl = -1
    else if(style === 4) styleControl = 1
    else if(style === 5) styleControl = 3
    else styleControl = 0

    let trainDataset = []
    let train_labels = [0, 1, 2, 3, 4, 5,6,7,8];
    let test_dataset = [];
    console.log(gender);
    if(gender.toLowerCase() === 'male'){
      train_labels.splice(6,3);
    }

    if(garment === "Pants" || garment === "Skirt" ){
      // update train data set and test data set
      trainDataset = generateTrainDataSet('bottoms') 
      test_dataset = userBottomMeasurments
    }else{
      // update train data set and test data set
      trainDataset = generateTrainDataSet('tops')
      test_dataset = userTopMeasurments

    }
    // predict knn
    console.log(test_dataset);
    console.log(trainDataset);
    console.log(train_labels);


    let knn = new KNN(trainDataset, train_labels, { k: 1}); 
    let ans = knn.predict(test_dataset);
    console.log("predicted ans" ,ans);

    
    
  };

  return (
    <div className="flex-auto w-60 flex flex-col p-12">
      <h1 className="text-center text-blue-500 uppercase align-top font-bold text-2xl m-5">
        Size Recommendation
      </h1>
      <form id="measurements" className="my-12 grid grid-cols-2 gap-5">
        <input
          className="input-filed"
          type="number"
          id="height"
          placeholder="Height"
          value={height}
          onChange={(e)=> setHeight(e.target.value)}
          required
        />
        <input
          className="input-filed"
          type="number"
          id="chest"
          placeholder="Chest"
          value={chest}
          onChange={(e)=> setChest(e.target.value)}
          required
        />
        <input
          className="input-filed"
          type="number"
          id="waist"
          placeholder="Waist"
          value={waist}
          onChange={(e)=> setWaist(e.target.value)}
          required
        />
        <input
          className="input-filed"
          type="number"
          id="hips"
          placeholder="Hips"
          value={hips}
          onChange={(e)=> setHips(e.target.value)}
          required
        />
        <input
          className="input-filed"
          type="number"
          id="inseam"
          placeholder="Inseam"
          value={inseam}
          onChange={(e)=> setInseam(e.target.value)}
          required
        />
        <input
          className="input-filed"
          type="number"
          id="neckline"
          placeholder="Neckline"
          value={neckline}
          onChange={(e)=> setNeckline(e.target.value)}
          required
        />
        <input
          className="input-filed"
          type="number"
          id="arm"
          placeholder="Arm length"
          value={armLength}
          onChange={(e)=> setArmLenght(e.target.value)}
        />
        <select className="input-filed" id="gender" value={gender} onChange={(e)=> setGender (e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select className="input-filed" id="garment" value={garment} onChange={(e)=> setGarment (e.target.value)}>
          {gender === "Male"? garmentsMale.map((gar) => <option key={gar} value={gar}>{gar}</option>) : garmentsFemale.map((gar) => <option key={gar} value={gar}>{gar}</option>)}
        </select>
      </form>
      <Slider
        aria-label="Fit Preferences"
        defaultValue={style}
        getAriaValueText={valuetext}
        step={1}
        marks={marks}
        min={1}
        max={5}
        key={style}
        onChange={(e)=> setStyle (e.target.value)}
      />

      <button
        className="my-20 text-white font-semibold block w-full py-2 bg-blue-500 rounded-md text-m shadow-lg focus:outline-none hover:bg-gray-100 hover:ring-2 hover:ring-blue-500 hover:text-blue-500"
        type="submit"
        form="measurements"
        onClick={onSubmit}
      >
        Show Fit
      </button>
    </div>
  );
}

export default Input;
