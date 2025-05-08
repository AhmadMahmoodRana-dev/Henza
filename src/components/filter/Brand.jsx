import React from "react";
import FilterMainComponent from "./FilterMainComponent";
import { CiSearch } from "react-icons/ci";
const Brand = ({ filterState, handleSortOptionClick }) => {
  const FabricOption = [
    { id: "Black", label: "Black" },
    { id: "Multi", label: "Multi" },
    { id: "White", label: "White" },
    { id: "Blue", label: "Blue" },
    { id: "Pink", label: "Pink" },
    { id: "Green", label: "Green" },
    { id: "Maroon", label: "Maroon" },
    { id: "Beige", label: "Beige" },
    { id: "Red", label: "Red" },
    { id: "Grey", label: "Grey" },
    { id: "Purple", label: "Purple" },
    { id: "Off-White", label: "Off-White" },
    { id: "Brown", label: "Brown" },
    { id: "Yellow", label: "Yellow" },
    { id: "Navy Blue", label: "Navy Blue" },
    { id: "Peach", label: "Peach" },
    { id: "Gold", label: "Gold" },
    { id: "Mustard", label: "Mustard" },
    { id: "Cream", label: "Cream" },
    { id: "Teal", label: "Teal" },
    { id: "Sky Blue", label: "Sky Blue" },
    { id: "Orange", label: "Orange" },
    { id: "Sea Blue", label: "Sea Blue" },
    { id: "Sea Green", label: "Sea Green" },
  ];

  return (
    <div>
      <div className="w-[95%] border py-2 my-3 rounded-sm border-gray-300 flex justify-center items-center">
        <div className="flex justify-center items-center px-2 text-lg text-gray-600">
          <CiSearch />
        </div>
        <input
          type="text"
          className="w-full outline-none px-2"
          placeholder="Search"
        />
      </div>
      <FilterMainComponent
        filterState={filterState}
        handleSortOptionClick={handleSortOptionClick}
        heading={"Brands"}
        options={FabricOption}
      />
    </div>
  );
};

export default Brand;
