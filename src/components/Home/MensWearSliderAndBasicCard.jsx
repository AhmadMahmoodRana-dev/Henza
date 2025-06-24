import React from "react";

const MensWearSliderAndBasicCard = ({index,item}) => {
  return (
    <div
      key={index}
      className="rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
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
        <h3 className="text-lg font-medium">{item?.productName}</h3>
        <p className="text-sm text-gray-600">{item?.inventory?.quantityAvailable} pieces available</p>
      </div>
    </div>
  );
};

export default MensWearSliderAndBasicCard;
