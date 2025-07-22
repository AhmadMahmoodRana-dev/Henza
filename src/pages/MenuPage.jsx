import HomePageMainCarousel from "../components/Home/HomePageMainCarousel";
import CategoryPageGridStructure from "../components/Home/CategoryPageGridStructure";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

const MenuPage = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { menuId } = useParams();

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedDateRanges, setSelectedDateRanges] = useState([]);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
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
    fetchAllProductsData();
  }, [menuId]);

  const priceRanges = [
    { id: "0-1000", label: "Under 1000 PKR", min: 0, max: 1000 },
    { id: "1000-5000", label: "1000 - 5000 PKR", min: 1000, max: 5000 },
    { id: "5000-10000", label: "5000 - 10000 PKR", min: 5000, max: 10000 },
    { id: "10000+", label: "Over 10000 PKR", min: 10000, max: Infinity },
  ];

 

  

  const resetFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedLetters([]);
    setSelectedDateRanges([]);
  };

  const filteredProducts = useMemo(() => {
    let products = allProductData.filter((product) => {
      if (selectedPriceRanges.length > 0) {
        const inPriceRange = selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          return product.price >= range.min && product.price <= range.max;
        });
        if (!inPriceRange) return false;
      }
      if (selectedLetters.length > 0) {
        const firstLetter = product.productName.charAt(0).toUpperCase();
        if (!selectedLetters.includes(firstLetter)) return false;
      }
      return true;
    });

    products.sort((a, b) => {
      switch (sortOption) {
        case "az":
          return a.productName.localeCompare(b.productName);
        case "za":
          return b.productName.localeCompare(a.productName);
        case "low-to-high":
          return a.price - b.price;
        case "high-to-low":
          return b.price - a.price;
        case "old-to-new":
          return parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1]);
        case "new-to-old":
          return parseInt(b.id.split("-")[1]) - parseInt(a.id.split("-")[1]);
        default:
          return 0;
      }
    });

    return products;
  }, [allProductData, selectedPriceRanges, selectedLetters, sortOption]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((groups, product) => {
      const collection = product.collectionName || "Uncategorized";
      if (!groups[collection]) groups[collection] = [];
      groups[collection].push(product);
      return groups;
    }, {});
  }, [filteredProducts]);

 
  return (
    <>
      <div className="w-full min-h-screen xl:px-16 lg:px-12 md:px-10 sm:px-8 px-4">
        <HomePageMainCarousel />

        <div className="flex justify-between items-center mb-6 mt-6">
          <h2 className="text-2xl font-semibold"></h2>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
          >
            <option value="featured">Featured</option>
            <option value="best-selling">Best selling</option>
            <option value="az">Alphabetically, A-Z</option>
            <option value="za">Alphabetically, Z-A</option>
            <option value="low-to-high">Price, low to high</option>
            <option value="high-to-low">Price, high to low</option>
            <option value="old-to-new">Date, old to new</option>
            <option value="new-to-old">Date, new to old</option>
          </select>
        </div>

          <div className="w-full">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700">
                  No products found
                </h3>
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
      <Footer />
    </>
  );
};

export default MenuPage;