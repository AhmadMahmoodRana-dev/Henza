import React from "react";
import { useParams } from "react-router-dom";
import TrendingProducts from "../components/Home/TrendingProducts";
import Footer from "../components/Footer/Footer";

const CategoryPage = () => {
  const { name } = useParams();
  return (
    <>

    <div className="w-full bg-[#fff] h-[82vh] mt-[10px]">
      <div className="border-b border-b-gray-300 py-4 2xl:px-24 xl:px-18 px-4">
        <h1 className="text-black font-semibold text-2xl">{name}</h1>
        <h1 className="text-gray-600">6,334 Items</h1>
      </div>
      <div className="2xl:px-24 xl:px-18 px-4">
        <TrendingProducts show={false}/>
      </div>
      <Footer/>
    </div>

    </>
  );
};

export default CategoryPage;
