import React from "react";
import { Link } from "react-router-dom";
const SliderCard = ({ name, image, link }) => {
  return (
    <div className="w-[180px]">
      <Link to={`${link}${name}`}>
        <img src={image} alt="" className="w-full h-full" />
        <h2 className="text-center text-md text-gray-700 font-semibold italic">
          {name}{" "}
        </h2>
      </Link>
    </div>
  );
};

export default SliderCard;
