import { Link } from "react-router-dom";

const SliderCard = ({ name, image, link }) => {
  return (
    <Link to={`/collection/${name}`} className="flex flex-col items-center text-center">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-2 text-sm font-medium italic break-words max-w-[7rem]">{name}</p>
    </Link>
  );
};

export default SliderCard;