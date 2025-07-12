import { useState } from "react";
import MensWearSliderAndBasicCard from "./MensWearSliderAndBasicCard";
import { Link } from "react-router-dom";

const HomePageGridStructure = ({ heading, data }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? data : data?.slice(0, 8);

  return (
    <div className="max-w-full mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6">{heading}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6">
        {visibleProducts?.map((item, index) => (
          <MensWearSliderAndBasicCard key={index} index={index} item={item} />
        ))}
      </div>

      {data?.length > 8 && !showAll && (
        <div className="flex justify-center mt-6">
          <Link to={`/category/${heading}`}
            className="px-6 py-2 bg-[#075686] text-white rounded hover:bg-gray-800 transition duration-300"
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePageGridStructure;
