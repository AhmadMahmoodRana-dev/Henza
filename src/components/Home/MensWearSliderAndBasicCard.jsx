import React from "react";
import { Link } from "react-router-dom";

const MensWearSliderAndBasicCard = ({index,item}) => {
  return (
    <Link to={`/productDetail/${item?.id}`}
      key={index}
      className="rounded-xl overflow-hidden flex justify-center flex-col shadow hover:shadow-lg transition duration-300"
    >
      <div className="relative">
        <img
          src={item?.images[0]}
          alt={item?.productName}
          className="h-80 w-full object-cover"
        />
        <div className="absolute bottom-3 left-3 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm font-semibold">
          {item?.discount} % discount
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-[#075686]">PKR {item?.price}</h3>
        <h3 className="text-xl font-medium pt-3">{item?.productName}</h3>
        <p className="text-sm text-gray-600">{item?.inventory?.quantityAvailable} pieces available</p>
      </div>
        <button className="bg-[#075686] text-white font-semibold italic px-4 py-3 hover:bg-[#075686]/90 cursor-pointer">Add to Cart</button>
    </Link>
  );
};

export default MensWearSliderAndBasicCard;
