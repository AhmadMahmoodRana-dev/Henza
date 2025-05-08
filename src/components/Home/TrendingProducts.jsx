import { useState } from "react";
import TrendingProductFilters from "./TrendingProductFilters";
import TrendingProductCard from "./TrendingProductCard";
import { CiSliderHorizontal } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";

import image1 from "../../assets/unstiched (1).png";
import image2 from "../../assets/unstiched (2).png";
import image3 from "../../assets/unstiched (3).png";
import image4 from "../../assets/unstiched (4).png";
import image5 from "../../assets/unstiched (5).png";
import image6 from "../../assets/unstiched (6).png";
import image7 from "../../assets/unstiched (7).png";
import image8 from "../../assets/unstiched (8).png";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Agha Jaan • CELINE1",
    price: 9999,
    originalPrice: 33330,
    discount: 70,
    img: image1,
    express: true,
  },
  {
    id: 2,
    name: "Agha Jaan • CELINE2",
    price: 9999,
    originalPrice: 33330,
    discount: 70,
    img: image2,
    express: true,
  },
  {
    id: 3,
    name: "Agha Jaan • CELINE3",
    price: 9999,
    originalPrice: 33330,
    discount: 70,
    img: image3,
    express: true,
  },
  {
    id: 4,
    name: "Agha Jaan • CELINE4",
    price: 9999,
    originalPrice: 33330,
    discount: 70,
    img: image4,
    express: true,
  },
  {
    id: 5,
    name: "Agha Jaan • CELINE5",
    price: 9999,
    originalPrice: 33330,
    discount: 70,
    img: image5,
    express: true,
  },
  {
    id: 6,
    name: "Agha Jaan • CELINE6",
    price: 9999,
    originalPrice: 33330,
    discount: 70,
    img: image6,
    express: true,
  },
  {
    id: 7,
    name: "Agha Jaan • CELINE7",
    price: 9999,
    originalPrice: 33330,
    discount: 70,
    img: image7,
    express: true,
  },
  {
    id: 8,
    name: "Agha Jaan • CELINE8",
    price: 9999,
    originalPrice: 33330,
    discount: 70,
    img: image8,
    express: true,
  },
];

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

function TrendingProducts({ show }) {
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  const [products, setProducts] = useState(mockProducts);
  const [open, setOpen] = useState(null);

  const handleCloseFilter = () => setShowFilter(false);

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);

    const sortedProducts = [...mockProducts];

    switch (filters.sortBy) {
      case "price-low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      // Add more sort logic here as needed
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto w-full">
        {show ? (
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Product Catalog
          </h1>
        ) : null}

        {/* Filters bar */}
        <div className="flex items-center gap-2 p-4 overflow-x-auto">
          <button
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
            onClick={() => setShowFilter(true)}
          >
            <CiSliderHorizontal size={20} />
          </button>

          {filters.map((filter, index) => (
            <div
              key={index}
              className="relative flex justify-center items-center"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex items-center justify-center gap-1 border border-gray-300 px-4 py-2 rounded-md text-md hover:bg-gray-100"
              >
                {filter}
                <p className="flex justify-center items-center">
                  <FiChevronDown />
                </p>
              </button>
            </div>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <TrendingProductCard key={product.id} product={product} />
          ))}
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
