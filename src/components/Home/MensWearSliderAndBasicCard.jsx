import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MensWearSliderAndBasicCard = ({ index, item }) => {
  const [hovered, setHovered] = useState(false);
  const getDiscountPercentage = (originalPrice, discountAmount) => {
    if (!originalPrice || originalPrice === 0) return 0;
    return (discountAmount / originalPrice) * 100;
  };

  const hasDiscount = item?.discount > 0;
  const percentage = hasDiscount
    ? getDiscountPercentage(item?.price, item?.discount)
    : 0;

  return (
    <Link
      to={`/productDetail/${item?.id}`}
      key={index}
      className="min-w-[200px] cursor-pointer bg-white rounded-lg  transition duration-200 relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "600 / 850" }}>
        {/* Main Image */}
        <img
          src={item?.images[0]}
          alt={item?.productName}
          className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-500 ${
            hovered && item?.images[1] ? "opacity-0" : "opacity-100"
          }`}
        />
        
        {/* Hover Image */}
        {item?.images[1] && (
          <img
            src={item?.images[1]}
            alt={item?.productName}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-lg transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-[#fc2743] text-white text-sm px-2 py-1 rounded z-10">
            {percentage.toFixed(0)}%
          </span>
        )}

        <button className="absolute top-2 right-2 text-gray-700 text-xl z-10">
          <FaRegHeart />
        </button>

        <button className="bg-white p-3 hover:bg-[#fc2743] hover:text-white transition-all ease-in-out duration-1000 cursor-pointer rounded-full absolute bottom-2 right-1 z-10">
          <IoBagAddOutline />
        </button>
      </div>

      <div className="p-4">
        <p className="text-sm font-light text-[#000000]">
          {item?.collectionName}
        </p>
        <p className="text-[20px] text-[#000000] font-normal font-sans uppercase">
          {item?.productName} ({item?.inventory?.SKU})
        </p>
        <div className="flex gap-4">
          {hasDiscount && (
            <p className="text-md line-through text-gray-700 font-semibold">
              PKR {item?.price?.toLocaleString() || 0}
            </p>
          )}
          <p
            className={`text-md font-semibold ${
              hasDiscount ? "text-[#fc2743]" : "text-[#fc2743]"
            }`}
          >
            PKR{" "}
            {hasDiscount
              ? (item?.price - item?.discount)?.toLocaleString()
              : item?.price?.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MensWearSliderAndBasicCard;