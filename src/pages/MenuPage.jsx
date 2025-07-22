import HomePageMainCarousel from "../components/Home/HomePageMainCarousel";
import HomePageGridStructure from "../components/Home/HomePageGridStructure";
import HomePageCategorySlider from "../components/Home/HomePageCategorySlider";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaFilter, FaTimes } from "react-icons/fa";
import CategoryPageGridStructure from "../components/Home/CategoryPageGridStructure";

const MenuPage = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { menuId } = useParams();
  
  // Filter states
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedDateRanges, setSelectedDateRanges] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchAllProductsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://henza.zaffarsons.com/henza/get-products-by-menu/${menuId}`
      );
      setAllProductData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProductsData();
  }, [menuId]);

  // Extract unique first letters for filter
  const firstLetters = useMemo(() => {
    const letters = new Set();
    allProductData.forEach(product => {
      const firstLetter = product.productName.charAt(0).toUpperCase();
      if (firstLetter) letters.add(firstLetter);
    });
    return Array.from(letters).sort();
  }, [allProductData]);

  // Filter configuration
  const priceRanges = [
    { id: "0-1000", label: "Under 1000 PKR", min: 0, max: 1000 },
    { id: "1000-5000", label: "1000 - 5000 PKR", min: 1000, max: 5000 },
    { id: "5000-10000", label: "5000 - 10000 PKR", min: 5000, max: 10000 },
    { id: "10000+", label: "Over 10000 PKR", min: 10000, max: Infinity }
  ];

  const dateRanges = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" }
  ];

  // Filter handler functions
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "price":
        setSelectedPriceRanges(prev => 
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case "letter":
        setSelectedLetters(prev => 
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case "date":
        setSelectedDateRanges(prev => 
          prev.includes(value) ? [] : [value]
        );
        break;
      default:
        break;
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedLetters([]);
    setSelectedDateRanges([]);
  };

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    if (!allProductData.length) return [];

    return allProductData.filter(product => {
      // Price filter
      if (selectedPriceRanges.length > 0) {
        const inPriceRange = selectedPriceRanges.some(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId);
          return product.price >= range.min && product.price <= range.max;
        });
        if (!inPriceRange) return false;
      }

      // Letter filter
      if (selectedLetters.length > 0) {
        const firstLetter = product.productName.charAt(0).toUpperCase();
        if (!selectedLetters.includes(firstLetter)) return false;
      }

      return true;
    }).sort((a, b) => {
      // Date sorting
      if (selectedDateRanges.includes("newest")) {
        return parseInt(b.id.split("-")[1]) - parseInt(a.id.split("-")[1]);
      } else if (selectedDateRanges.includes("oldest")) {
        return parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1]);
      }
      return 0;
    });
  }, [allProductData, selectedPriceRanges, selectedLetters, selectedDateRanges]);

  // Group filtered products
  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((groups, product) => {
      const collection = product.collectionName || "Uncategorized";
      if (!groups[collection]) groups[collection] = [];
      groups[collection].push(product);
      return groups;
    }, {});
  }, [filteredProducts]);

  // Filter sidebar component
  const renderFilterSidebar = () => (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-32 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button 
          onClick={resetFilters}
          className="text-sm text-rose-600 hover:text-rose-800"
        >
          Reset All
        </button>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <div key={range.id} className="flex items-center">
              <input
                id={`price-${range.id}`}
                type="checkbox"
                checked={selectedPriceRanges.includes(range.id)}
                onChange={() => handleFilterChange("price", range.id)}
                className="h-4 w-4 text-rose-600 rounded focus:ring-rose-500"
              />
              <label 
                htmlFor={`price-${range.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Alphabet Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Product Name</h4>
        <div className="flex flex-wrap gap-2">
          {firstLetters.map(letter => (
            <button
              key={letter}
              onClick={() => handleFilterChange("letter", letter)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedLetters.includes(letter)
                  ? "bg-rose-600 text-white border-rose-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Date Filter */}
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Date Added</h4>
        <div className="space-y-2">
          {dateRanges.map(range => (
            <div key={range.id} className="flex items-center">
              <input
                id={`date-${range.id}`}
                type="radio"
                name="date-range"
                checked={selectedDateRanges.includes(range.id)}
                onChange={() => handleFilterChange("date", range.id)}
                className="h-4 w-4 text-rose-600 focus:ring-rose-500"
              />
              <label 
                htmlFor={`date-${range.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="w-full min-h-screen xl:px-16 lg:px-12 md:px-10 sm:px-8 px-4">
        <HomePageMainCarousel />
        {/* <HomePageCategorySlider heading={"UNSTITCHED"} /> */}
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-end my-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
          >
            <FaFilter /> Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:w-1/4">
            {renderFilterSidebar()}
          </div>

          {/* Mobile Filters Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
              <div className="fixed inset-0 flex">
                <div className="relative bg-white w-full max-w-xs h-full shadow-xl">
                  <div className="absolute top-0 right-0 p-4">
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>
                  <div className="p-6 mt-12">
                    {renderFilterSidebar()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters to find what you're looking for
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              Object.entries(groupedProducts).map(([collection, products]) => (
                <div key={collection} className="mb-12">
                  <CategoryPageGridStructure 
                    heading={collection} 
                    data={products} 
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;