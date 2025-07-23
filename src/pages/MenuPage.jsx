import HomePageMainCarousel from "../components/Home/HomePageMainCarousel";
import CategoryPageGridStructure from "../components/Home/CategoryPageGridStructure";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState, useMemo, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "az", label: "Alphabetically, A-Z" },
  { value: "za", label: "Alphabetically, Z-A" },
  { value: "low-to-high", label: "Price, low to high" },
  { value: "high-to-low", label: "Price, high to low" },
  { value: "old-to-new", label: "Date, old to new" },
  { value: "new-to-old", label: "Date, new to old" },
];

const MenuPage = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { menuId, name } = useParams();

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
        {/* <HomePageMainCarousel /> */}
        <h2 className="text-2xl font-semibold border-b border-gray-300 py-6 text-center">{name}</h2>

        <div className="flex justify-between items-center mb-6 mt-6">
          <h2></h2>

          <Listbox value={sortOption} onChange={setSortOption}>
            <div className="relative w-60 text-sm">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600">
                <span className="block truncate">
                  {sortOptions.find((option) => option.value === sortOption)?.label}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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