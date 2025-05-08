import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const TrendingProductCard = ({ product }) => {
 

  return (
    <Link
    to={`/productDetail/${product.id}`}
      key={product.id}
      className="min-w-[200px] cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition duration-200 relative"
    >
      <div className="relative">
        <img
          src={product.img}
          alt={product.name}
          className="rounded-t-lg h-96 w-full object-cover"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-[#075686] text-white text-sm px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
        <button className="absolute top-2 right-2 text-gray-700 text-xl">
          <FaRegHeart />
        </button>
        <button
          className="bg-white p-3 hover:bg-[#075686] hover:text-white transition-all ease-in-out duration-1000 cursor-pointer rounded-full absolute bottom-2 right-1"
        >
          <IoBagAddOutline />
        </button>
      </div>

      <div className="p-4">
        <p className="text-lg text-[#075686] font-semibold">
          PKR {product.price.toLocaleString()}
        </p>
        {product.originalPrice && (
          <p className="text-sm text-gray-400 line-through">
            PKR {product.originalPrice.toLocaleString()}
          </p>
        )}
        <p className="text-sm mt-2">{product.name}</p>

        {product.express && (
          <span className="mt-2 inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded">
            ⚡ Express
          </span>
        )}
      </div>
    </Link>
  );
};

export default TrendingProductCard;
