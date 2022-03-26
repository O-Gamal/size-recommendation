import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import sizechart from "../sizechart.json";

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

const garmentsMale = ["Shirt", "T-shirt", "Jacket", "Blazer", "Pants"];
const garmentsFemale = ["Blouse", "Dress", "Jacket", "Pants", "Skirt"];
const topGarments = ["Blouse", "Shirt", "T-shirt", "Blazer", "Jacket", "Dress"];
const bottomGarments = ["Pants", "Skirt"];

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

  useEffect(() => {
    props.parentCallback("undefined");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const sizes = Object.keys(sizechart["H&M"][gender.toLowerCase()]["tops"]);
    const tops = sizechart["H&M"][gender.toLowerCase()]["tops"];
    const bottoms = sizechart["H&M"][gender.toLowerCase()]["bottoms"];
    let styleControl; 
    let sizeExist = false;
    if (style === 1) styleControl = -3;
    else if (style === 2) styleControl = -1;
    else if (style === 4) styleControl = 1;
    else if (style === 5) styleControl = 3;
    else styleControl = 0;

    if (garment === "Pants" || garment === "Skirt") {
      for (let s in sizes) {
        if (
          bottoms[sizes[s]]["waist"] >= parseInt(waist) + styleControl &&
          bottoms[sizes[s]]["hips"] >= parseInt(hips) + styleControl &&
          bottoms[sizes[s]]["inseam"] >= parseInt(inseam)
        ) {
          props.parentCallback(sizes[s].toUpperCase());
          console.log(sizes[s]);
          sizeExist = true;
          break;
        }
      }

    } else {
      if (gender === "Female") {
        for (let s in sizes) {
          if (
            tops[sizes[s]]["neckline"] >= parseInt(neckline) &&
            tops[sizes[s]]["chest"] >= parseInt(chest) + styleControl &&
            tops[sizes[s]]["waist"] >= parseInt(waist) + styleControl &&
            tops[sizes[s]]["armLength"] >= parseInt(armLength)
          ) {
            props.parentCallback(sizes[s].toUpperCase());
            console.log(sizes[s]);
            sizeExist = true;
            break;
          }
        }
      } else {
        for (let s in sizes) {
          if (
            tops[sizes[s]]["height"] >= parseInt(height) &&
            tops[sizes[s]]["neckline"] >= parseInt(neckline) &&
            tops[sizes[s]]["chest"] >= parseInt(chest) + styleControl &&
            tops[sizes[s]]["waist"] >= parseInt(waist) + styleControl &&
            tops[sizes[s]]["armLength"] >= parseInt(armLength)
          ) {
            props.parentCallback(sizes[s].toUpperCase());
            console.log(sizes[s]);
            sizeExist = true;
            break;
          }
        }
      }
    }
    if (!sizeExist) {
      props.parentCallback('There is no size for your measurements');
    }
};

return (
  <div className="flex items-center justify-center ">
    <div className="flex flex-col items-center justify-center w-5/6 mt-5">
      <h1 className="text-center text-blue-500 uppercase font-bold text-2xl m-5">
        Size Recommendation
      </h1>
      <form
        id="measurements"
        className="my-10 grid grid-cols-2 gap-5 px-10 w-full"
        onChange={onSubmit}
      >
        <input
          className="input-filed"
          type="number"
          id="height"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required={topGarments.includes(garment) && gender === "Male"}
        />
        <input
          className="input-filed"
          type="number"
          id="chest"
          placeholder={gender === "Male" ? "Chest" : "Bust"}
          value={chest}
          onChange={(e) => setChest(e.target.value)}
          required={topGarments.includes(garment)}
        />
        <input
          className="input-filed"
          type="number"
          id="waist"
          placeholder="Waist"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          required
        />
        <input
          className="input-filed"
          type="number"
          id="hips"
          placeholder="Hips"
          value={hips}
          onChange={(e) => setHips(e.target.value)}
          required={bottomGarments.includes(garment)}
        />
        <input
          className="input-filed"
          type="number"
          id="inseam"
          placeholder="Inseam"
          value={inseam}
          onChange={(e) => setInseam(e.target.value)}
          required={bottomGarments.includes(garment)}
        />
        <input
          className="input-filed"
          type="number"
          id="neckline"
          placeholder="Neckline"
          value={neckline}
          onChange={(e) => setNeckline(e.target.value)}
          required={topGarments.includes(garment)}
        />
        <input
          className="input-filed"
          type="number"
          id="arm"
          placeholder="Arm length"
          value={armLength}
          onChange={(e) => setArmLenght(e.target.value)}
          required={topGarments.includes(garment)}
        />
        <select
          className="input-filed"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          className="input-filed"
          id="garment"
          value={garment}
          onChange={(e) => setGarment(e.target.value)}
        >
          {gender === "Male"
            ? garmentsMale.map((gar) => (
              <option key={gar} value={gar}>
                {gar}
              </option>
            ))
            : garmentsFemale.map((gar) => (
              <option key={gar} value={gar}>
                {gar}
              </option>
            ))}
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
        onChange={(e) => {
          onSubmit(e)
          setStyle(e.target.value)
        }}

        sx={{
          width: "80%",
        }}
      />

      {/* <button
          className="my-20 w-1/2 text-white font-semibold block py-2 bg-blue-500 rounded-lg text-m shadow-lg focus:outline-none hover:bg-gray-100 hover:ring-2 hover:ring-blue-500 hover:text-blue-500 disabled:bg-gray-500"
          type="button"
          form="measurements"
          onClick={onSubmit}
          disabled={!valid}
        >
          Show Fit
        </button> */}
    </div>
  </div>
);
}

export default Input;
