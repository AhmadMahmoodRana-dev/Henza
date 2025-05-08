import React from "react";
import FilterMainComponent from "./FilterMainComponent";
import { CiSearch } from "react-icons/ci";
const Season = ({ filterState, handleSortOptionClick }) => {
  const FabricOption = [
    { id: "All Season", label: "All Season" },
    { id: "Summer Wear", label: "Summer Wear" },
    { id: "Winter Wear", label: "Winter Wear" },
    { id: "Fall Wear", label: "Fall Wear" },
    { id: "Spring Wear", label: "Spring Wear" },
    
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
        heading={"Season"}
        options={FabricOption}
      />
    </div>
  );
};

export default Season;
