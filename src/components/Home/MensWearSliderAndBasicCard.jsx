import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MensWearSliderAndBasicCard = ({ index, item }) => {
    const avg = (item?.price * item?.discount) / 100;
  return (
    <Link
      to={`/productDetail/${item?.id}`}
      key={index}
      className="min-w-[200px] cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition duration-200 relative"
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: "600 / 850" }}
      >
        <img
          src={item?.images[0]}
          alt={item?.productName}
          className="w-full h-full object-cover rounded-t-lg"
        />

        {item?.discount && (
          <span className="absolute top-2 left-2 bg-[#075686] text-white text-sm px-2 py-1 rounded">
            -{item.discount}%
          </span>
        )}

        <button className="absolute top-2 right-2 text-gray-700 text-xl">
          <FaRegHeart />
        </button>

        <button className="bg-white p-3 hover:bg-[#075686] hover:text-white transition-all ease-in-out duration-1000 cursor-pointer rounded-full absolute bottom-2 right-1">
          <IoBagAddOutline />
        </button>
      </div>

      <div className="p-4">
        <p className="text-lg text-[#075686] font-semibold">
          PKR {item?.price - avg}
        </p>

        {item?.price && (
          <p className="text-sm text-gray-400 line-through">
            PKR {item?.price.toLocaleString()}
          </p>
        )}

        <p className="text-sm mt-2">{item?.productName}</p>

        {/* Uncomment this if needed */}
        {/* {product.express && (
          <span className="mt-2 inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded">
            ⚡ Express
          </span>
        )} */}
      </div>
    </Link>
  );
};

export default MensWearSliderAndBasicCard;
