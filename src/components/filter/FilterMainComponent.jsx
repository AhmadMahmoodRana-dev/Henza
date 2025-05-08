import React, { useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";

const FilterMainComponent = ({
  filterState,
  handleSortOptionClick,
  options,
  heading,
}) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="space-y-4">
      <h3 className="my-3 text-lg font-medium text-gray-700">{heading}</h3>
      <div className="flex flex-wrap gap-2 border-b border-b-gray-200 pb-3">
        {options.slice(0, visibleCount).map((option) => (
          <button
            key={option.id}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filterState.sortBy === option.id
                ? "bg-gray-900 text-white"
                : "border border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
            onClick={() => handleSortOptionClick(option.id)}
          >
            {option.label}
          </button>
        ))}
        {visibleCount < options.length && (
          <button
            className="rounded-md px-2 py-2 text-sm font-medium transition-colors border border-gray-300 text-gray-700 hover:border-gray-400"
            onClick={handleShowMore}
          >
            <PiDotsThreeBold size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterMainComponent;
