import { useState, useEffect, useMemo } from "react";
import TrendingProductFilters from "./TrendingProductFilters";
import TrendingProductCard from "./TrendingProductCard";
import { CiSliderHorizontal } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import MensWearSliderAndBasicCard from "./MensWearSliderAndBasicCard";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

// Filter options
const filters = [
  "Price",
  "Size",
  "Color",
  "Brands",
  "Season",
  "Occasions",
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "az", label: "Alphabetically, A-Z" },
  { value: "za", label: "Alphabetically, Z-A" },
  { value: "price-low-high", label: "Price, low to high" },
  { value: "price-high-low", label: "Price, high to low" },
  { value: "old-to-new", label: "Date, old to new" },
  { value: "new-to-old", label: "Date, new to old" },
];

const priceRanges = [
  { id: "0-1000", label: "Under 1000 PKR", min: 0, max: 1000 },
  { id: "1000-5000", label: "1000 - 5000 PKR", min: 1000, max: 5000 },
  { id: "5000-10000", label: "5000 - 10000 PKR", min: 5000, max: 10000 },
  { id: "10000+", label: "Over 10000 PKR", min: 10000, max: Infinity },
];

function TrendingProducts({ show, product }) {
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [selectedFilters, setSelectedFilters] = useState({
    Price: [],
    Size: [],
    Color: [],
    Brands: [],
    Season: [],
    Occasions: [],
  });

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters({
      Price: [],
      Size: [],
      Color: [],
      Brands: [],
      Season: [],
      Occasions: [],
    });
    setSortOption("featured");
  };

  // Handle individual filter changes
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...(product || [])];

    // Apply price filter
    if (selectedFilters.Price.length > 0) {
      result = result.filter(item => {
        return selectedFilters.Price.some(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId);
          return item.price >= range.min && item.price <= range.max;
        });
      });
    }

    // Apply other filters
    Object.keys(selectedFilters).forEach(filterKey => {
      if (filterKey !== "Price" && selectedFilters[filterKey].length > 0) {
        result = result.filter(item => 
          selectedFilters[filterKey].includes(item[filterKey.toLowerCase()])
        );
      }
    });

    // Apply sorting
    switch (sortOption) {
      case "az":
        return result.sort((a, b) => a.productName.localeCompare(b.productName));
      case "za":
        return result.sort((a, b) => b.productName.localeCompare(a.productName));
      case "price-low-high":
        return result.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return result.sort((a, b) => b.price - a.price);
      case "old-to-new":
        return result.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "new-to-old":
        return result.sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return result;
    }
  }, [product, selectedFilters, sortOption]);

  const handleCloseFilter = () => setShowFilter(false);

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto w-full">
        {/* Filter header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <CiSliderHorizontal size={20} />
              <span>Filters</span>
            </button>
            
            {/* Selected filters badges */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([key, values]) => (
                values.map(value => (
                  <span 
                    key={`${key}-${value}`}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {value}
                    <button 
                      onClick={() => handleFilterChange(key, values.filter(v => v !== value))}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))
              ))}
              {Object.values(selectedFilters).some(arr => arr.length > 0) && (
                <button 
                  onClick={resetFilters}
                  className="text-rose-600 text-sm font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
          
          {/* Sort dropdown */}
          <Listbox value={sortOption} onChange={setSortOption}>
            <div className="relative w-full md:w-60 text-sm">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600">
                <span className="block truncate">
                  {sortOptions.find((option) => option.value === sortOption)?.label}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {sortOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-rose-100 text-rose-900" : "text-gray-900"
                      } ${selected ? "bg-rose-200 font-semibold" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? "font-semibold" : ""}`}>
                        {option.label}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          {showFilter && (
            <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:bg-transparent lg:relative lg:inset-auto lg:z-auto">
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl lg:static lg:max-w-xs lg:shadow-none">
                <div className="p-6 h-full overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <button 
                      onClick={handleCloseFilter} 
                      className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <button 
                    onClick={resetFilters}
                    className="text-rose-600 mb-6 font-medium"
                  >
                    Reset all filters
                  </button>
                  
                  {/* Price filter */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-3">Price</h3>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <div key={range.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={range.id}
                            checked={selectedFilters.Price.includes(range.id)}
                            onChange={(e) => {
                              const newSelection = e.target.checked
                                ? [...selectedFilters.Price, range.id]
                                : selectedFilters.Price.filter(id => id !== range.id);
                              handleFilterChange("Price", newSelection);
                            }}
                            className="mr-3 h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                          />
                          <label htmlFor={range.id} className="text-gray-700">
                            {range.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Other filters */}
                  {filters
                    .filter(f => f !== "Price")
                    .map(filterKey => (
                      <div key={filterKey} className="mb-8">
                        <h3 className="font-semibold mb-3">{filterKey}</h3>
                        <div className="space-y-2">
                          {/* In a real app, these would be dynamic based on product attributes */}
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${filterKey}-${i}`}
                                checked={selectedFilters[filterKey].includes(`${filterKey} Option ${i}`)}
                                onChange={(e) => {
                                  const value = `${filterKey} Option ${i}`;
                                  const newSelection = e.target.checked
                                    ? [...selectedFilters[filterKey], value]
                                    : selectedFilters[filterKey].filter(v => v !== value);
                                  handleFilterChange(filterKey, newSelection);
                                }}
                                className="mr-3 h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                              />
                              <label htmlFor={`${filterKey}-${i}`} className="text-gray-700">
                                {filterKey} Option {i}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters to find what you're looking for
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((item, index) => (
                  <MensWearSliderAndBasicCard key={index} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingProducts;