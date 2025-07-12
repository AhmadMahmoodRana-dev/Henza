import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import MensWearSliderAndBasicCard from "../components/Home/MensWearSliderAndBasicCard";
import axios from "axios";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { name } = useParams();
  const [allProductData, setAllProductData] = useState([]);

  const fetchAllProductsData = async () => {
    try {
      const { data } = await axios.get(
        `https://henza.zaffarsons.com/henza/get-all-products`
      );
      setAllProductData(data);
      console.log("ALL PRODUCT DATA", data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllProductsData();
  }, []);

  function filterProductsByCollection(products, collectionName) {
    return products.filter(
      (product) => product.collectionName === collectionName
    );
  }

  const filteredProducts = filterProductsByCollection(allProductData, name);

  return (
    <>
      <div className="w-full bg-[#fff] h-[82vh] mt-[10px]">
        <div className="border-b border-b-gray-300 py-4 2xl:px-24 xl:px-18 px-4">
          <h1 className="text-black font-semibold text-2xl">{name}</h1>
          <h1 className="text-gray-600">{filteredProducts.length} Items</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6 2xl:px-24 xl:px-18 px-4 pt-10">
          {filteredProducts?.map((item, index) => (
            <MensWearSliderAndBasicCard key={index} index={index} item={item} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
