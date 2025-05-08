import React from "react";
import HomePageMainCarousel from "../components/Home/HomePageMainCarousel";
import HomePageGridStructure from "../components/Home/HomePageGridStructure";
import HomePageCategorySlider from "../components/Home/HomePageCategorySlider";
import BrandCardGrid from "../components/Home/BrandCardGrid";
import LargeCardSlider from "../components/Home/LargeCardSlider";
import image1 from "../assets/unstiched (1).png";
import image2 from "../assets/unstiched (2).png";
import image3 from "../assets/unstiched (3).png";
import image4 from "../assets/unstiched (4).png";
import image5 from "../assets/unstiched (5).png";
import image6 from "../assets/unstiched (6).png";
import image7 from "../assets/unstiched (7).png";
import image8 from "../assets/unstiched (8).png";
import TrendingProducts from "../components/Home/TrendingProducts";
import Footer from "../components/Footer/Footer";
const Home = () => {

  const products = [
    {
      brand: "Agha Jaan",
      items: "134 items",
      discount: "Upto 80% off",
      image: image1,
    },
    {
      brand: "Haseens Official",
      items: "244 items",
      discount: "Upto 80% off",
      image: image2,
    },
    {
      brand: "Diara Couture",
      items: "66 items",
      discount: "Upto 20% off",
      image: image3,
    },
    {
      brand: "Four Season Boutique",
      items: "230 items",
      discount: "Upto 75% off",
      image: image4,
    },
    {
      brand: "Four Season Boutique",
      items: "230 items",
      discount: "Upto 75% off",
      image: image5,
    },
    {
      brand: "Four Season Boutique",
      items: "230 items",
      discount: "Upto 75% off",
      image: image6,
    },
    {
      brand: "Four Season Boutique",
      items: "230 items",
      discount: "Upto 75% off",
      image: image7,
    },
    {
      brand: "Four Season Boutique",
      items: "230 items",
      discount: "Upto 75% off",
      image: image8,
    },
  ];

  return (
    <div>
      <div className="w-full min-h-screen xl:px-16 lg:px-12 md:px-10 sm:px-8 px-4 ">
        <HomePageMainCarousel />
        <HomePageCategorySlider heading={"UNSTITCHED"} />
        <HomePageGridStructure heading={"Shop Luxury Picks"} />
        {/* <HomePageGridStructure heading={"Buy Festive Glam"} /> */}
        {/* <HomePageGridStructure heading={"Shop Daily Pret"} /> */}
        {/* <BrandCardGrid /> */}
        {/* <LargeCardSlider heading={"Buy Menswear"} products={products} /> */}
        {/* <LargeCardSlider heading={"Shop Kidswear"} products={products} /> */}
        {/* <HomePageCategorySlider /> */}
        {/* <LargeCardSlider heading={"Shop Accessories"} products={products} /> */}
        <HomePageGridStructure heading={"SUMMER LAWN '25"} />
        <TrendingProducts />
        {/* <OneTimeShowModel /> */}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
