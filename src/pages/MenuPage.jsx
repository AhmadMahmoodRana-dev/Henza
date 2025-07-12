import HomePageMainCarousel from "../components/Home/HomePageMainCarousel";
import HomePageGridStructure from "../components/Home/HomePageGridStructure";
import HomePageCategorySlider from "../components/Home/HomePageCategorySlider";
import TrendingProducts from "../components/Home/TrendingProducts";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MenuPage = () => {
  const [allProductData, setAllProductData] = useState([]);
  const {menuId} = useParams();

  const fetchAllProductsData = async () => {
    try {
      const { data } = await axios.get(
        `https://henza.zaffarsons.com/henza/get-products-by-menu/${menuId}`
      );
      setAllProductData(data);
      console.log("ALL PRODUCT DATA MENUPAEG", data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllProductsData();
  }, []);

  // GROUPED PRODUCTS
  const groupedProducts = allProductData.reduce((groups, product) => {
    const collection = product.collectionName || "Uncategorized";
    if (!groups[collection]) {
      groups[collection] = [];
    }
    groups[collection].push(product);
    return groups;
  }, {});

  return (
    <div>
      <div className="w-full min-h-screen xl:px-16 lg:px-12 md:px-10 sm:px-8 px-4 ">
        <HomePageMainCarousel />
        <HomePageCategorySlider heading={"UNSTITCHED"} />
        {/* <HomePageGridStructure heading={"Shop Luxury Picks"} /> */}
        {Object.entries(groupedProducts).map(([collection, products]) => (
          <div key={collection}>
                <HomePageGridStructure heading={collection} data={products} />
          </div>
        ))}
        {/* <TrendingProducts /> */}
      </div>

      <Footer />
    </div>
  );
};

export default MenuPage;
