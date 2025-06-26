
import MensWearSliderAndBasicCard from "./MensWearSliderAndBasicCard";

const HomePageGridStructure = ({heading,data}) => {
  return (
    <div className="max-w-full mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6">
        {data?.map((item, index) => (
         <MensWearSliderAndBasicCard index={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePageGridStructure;