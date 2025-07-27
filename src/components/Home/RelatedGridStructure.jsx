import { useState } from "react";
import MensWearSliderAndBasicCard from "./MensWearSliderAndBasicCard";
import Footer from "../Footer/Footer";

const RelatedGridStructure = ({ heading, data }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? data : data?.slice(0, 8);

  return (
    <>

    <div className=" px-12 w-[90%]">
      {/* <h2 className="text-3xl font-semibold mb-6">{heading}</h2> */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6">
        {visibleProducts?.map((item, index) => (
          <MensWearSliderAndBasicCard key={index} index={index} item={item} />
        ))}
      </div>

     
    </div>
    <Footer/>
    </>
  );
};

export default RelatedGridStructure;
