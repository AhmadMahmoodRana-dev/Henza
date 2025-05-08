import React from "react";
import FilterMainComponent from "./FilterMainComponent";
import { CiSearch } from "react-icons/ci";
const Fabric = ({ filterState, handleSortOptionClick }) => {
  const FabricOption = [
    { id: "cotton", label: "Cotton" },
    { id: "wash&wear", label: "Wash & Wear" },
    { id: "raw-silk", label: "Raw Silk" },
    { id: "silk", label: "Silk" },
    { id: "wool", label: "Chifoon" },
    { id: "fleece", label: "Fleece" },
    { id: "jamawar", label: "Jamawar" },
    { id: "polyester", label: "Polyester" },
    { id: "jersey", label: "Jersey" },
    { id: "linen", label: "Linen" },
    { id: "denim", label: "Denim" },
    { id: "velvet", label: "Velvet" },
    { id: "khaddar", label: "Khaddar" },
    { id: "net", label: "Net" },
    { id: "organza", label: "Organza" },
    { id: "tissue", label: "Tissue" },
    { id: "velvet", label: "Velvet" },
    { id: "khaddar", label: "Khaddar" },
    { id: "net", label: "Net" },
    { id: "organza", label: "Organza" },
    { id: "tissue", label: "Tissue" },
    { id: "velvet", label: "Velvet" },
    { id: "khaddar", label: "Khaddar" },
    { id: "net", label: "Net" },
    { id: "organza", label: "Organza" },
    { id: "tissue", label: "Tissue" },
  ];



  return (
   <div>
   <div className="w-[95%] border py-2 my-3 rounded-sm border-gray-300 flex justify-center items-center">
    <div className="flex justify-center items-center px-2 text-lg text-gray-600"><CiSearch/></div>
    <input type="text" className="w-full outline-none px-2" placeholder="Search by Fabric" />
   </div>
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Fabric"} options={FabricOption} />
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Shirt Fabric"} options={FabricOption} />
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Bottom Fabric"} options={FabricOption} />
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Trouser Fabric"} options={FabricOption} />
   </div>
  );
};

export default Fabric;
