import { useState, useEffect } from "react";
import TrendingProductFilters from "./TrendingProductFilters";
import TrendingProductCard from "./TrendingProductCard";
import { CiSliderHorizontal } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import MensWearSliderAndBasicCard from "./MensWearSliderAndBasicCard";

// Filter options
const filters = [
  "Fabric",
  "Price",
  "Size",
  "Color",
  "Brands",
  "Season",
  "Occasions",
  "Discount",
  "Delivery",
];

function TrendingProducts({ show, product }) {
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(null);

  // ✅ Update products when `product` prop changes
  useEffect(() => {
    if (Array.isArray(product)) {
      setProducts(product);
    }
  }, [product]);

  console.log("Products in TrendingProducts:", product);

  const handleCloseFilter = () => setShowFilter(false);

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);

    const sortedProducts = [...product];

    switch (filters.sortBy) {
      case "price-low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto w-full">
        {show && (
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Product Catalog
          </h1>
        )}

        {/* Filters bar */}
        <div className="flex items-center gap-2 p-4 overflow-x-auto">
          <button
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
            onClick={() => setShowFilter(true)}
          >
            <CiSliderHorizontal size={20} />
          </button>

          {filters.map((filter, index) => (
            <div key={index} className="relative flex justify-center items-center">
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex items-center justify-center gap-1 border border-gray-300 px-4 py-2 rounded-md text-md hover:bg-gray-100"
              >
                {filter}
                <FiChevronDown />
              </button>
            </div>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.length > 0 ? (
            products.map((item, index) => (
              <MensWearSliderAndBasicCard key={index} item={item} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No products found.</p>
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      {showFilter && (
        <TrendingProductFilters
          onClose={handleCloseFilter}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </div>
  );
}

export default TrendingProducts;
