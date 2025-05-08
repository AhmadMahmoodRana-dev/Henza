import React from "react";
import FilterMainComponent from "./FilterMainComponent";

const SortBy = ({filterState,handleSortOptionClick}) => {
    const sortOptions = [
        { id: 'recommended', label: 'Recommended' },
        { id: 'best-selling', label: 'Best Selling' },
        { id: 'newest-first', label: 'Newest First' },
        { id: 'price-low-high', label: 'Price: Low To High' },
        { id: 'price-high-low', label: 'Price: High To Low' },
        { id: 'discount-high-low', label: 'Discount: High To Low' },
        { id: 'discount-low-high', label: 'Discount: Low To High' },
        { id: 'delivery-earliest-latest', label: 'Delivery: Earliest To Latest' },
        { id: 'delivery-latest-earliest', label: 'Delivery: Latest To Earliest' },
      ];
    
  return (
    <FilterMainComponent filterState={filterState} handleSortOptionClick={handleSortOptionClick} heading={"Sort By"} options={sortOptions} />
  );
};

export default SortBy;
