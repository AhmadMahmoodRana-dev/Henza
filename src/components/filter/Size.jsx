import React from "react";
import FilterMainComponent from "./FilterMainComponent";
import { CiSearch } from "react-icons/ci";
const Size = ({ filterState, handleSortOptionClick }) => {
  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "L", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
    { id: "unstitched", label: "UNSTITCHED" },
  ];



  return (
   <div>
   <div className="w-[95%] border py-2 my-3 rounded-sm border-gray-300 flex justify-center items-center">
    <div className="flex justify-center items-center px-2 text-lg text-gray-600"><CiSearch/></div>
    <input type="text" className="w-full outline-none px-2" placeholder="Search by Fabric" />
   </div>
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Women Size"} options={sizes} />
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Men Size"} options={sizes} />
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Kids Size"} options={sizes} />
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Shoe Size"} options={sizes} />
   </div>
  );
};

export default Size;
