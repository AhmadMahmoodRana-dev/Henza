import { useState, useMemo, useEffect } from "react";
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
  const [showAllProducts, setShowAllProducts] = useState(false);
  const initialProductCount = 12;

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
    setShowAllProducts(false);
  };

  // Reset "show all" when filters change
  useEffect(() => {
    setShowAllProducts(false);
  }, [selectedFilters, sortOption]);

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

  // Determine which products to display
  const productsToDisplay = useMemo(() => {
    return showAllProducts 
      ? filteredProducts 
      : filteredProducts.slice(0, initialProductCount);
  }, [filteredProducts, showAllProducts]);

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto w-full">
        {/* Filter header */}
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          
          <h1></h1>
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
              <Listbox.Options className="absolute border border-gray-300 z-20 mt-1 max-h-auto w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm">
                {sortOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-[#fc2743] text-white" : "text-gray-900"
                      } ${selected ? "bg-[#fc2743] font-semibold text-white" : ""}`
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
        </div> */}

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          
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
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {productsToDisplay.map((item, index) => (
                    <MensWearSliderAndBasicCard key={index} item={item} />
                  ))}
                </div>
                
                {/* View All button */}
                {!showAllProducts && filteredProducts.length > initialProductCount && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setShowAllProducts(true)}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                      View All Products ({filteredProducts.length})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingProducts;