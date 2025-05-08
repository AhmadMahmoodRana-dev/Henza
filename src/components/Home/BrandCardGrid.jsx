import React from "react";
import image1 from "../../assets/brand1.png";
import image2 from "../../assets/brand2.png";
import image3 from "../../assets/brand3.png";
import image4 from "../../assets/brand4.png";
import image5 from "../../assets/brand5.png";
import image6 from "../../assets/brand6.png";

const luxuryPicks = [
  {
    brand: "Beechtere",
    image: image1,
  },
  {
    brand: "Sana Safinaz",
    image: image2,
  },
  {
    brand: "Saya",
    image: image3,
  },
  {
    brand: "Zeen",
    image: image4,
  },
  {
    brand: "Asim Jofa",
    image: image5,
  },
  {
    brand: "Bareeze Man",
    image: image6,
  },
 
];

const BrandCardGrid = ({heading}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">{heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-6 lg:grid-cols-3 gap-6">
        {luxuryPicks.map((item, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="relative pb-4">
              <img
                src={item.image}
                alt={item.brand}
                className="xl:h-[170px] lg:h-[190px] md:h-[190px] w-full object-cover"
              />
              
            </div>
              <h3 className="text-lg text-center font-medium">{item.brand}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCardGrid;