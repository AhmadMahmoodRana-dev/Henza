import React, { useEffect, useState } from "react";
import SliderCard from "./SliderCard";
import { IoIosArrowBack } from "react-icons/io";
import carousel1 from "../../assets/category (4).png";
import carousel2 from "../../assets/category (12).png";
import carousel3 from "../../assets/category (11).png";
import carousel4 from "../../assets/category (14).png";
import carousel5 from "../../assets/category (8).png";
import carousel6 from "../../assets/category (9).png";
import carousel7 from "../../assets/category (10).png";

const HomePageCategorySlider = ({heading}) => {
  const products = [
    { id: 1, name: "Lawn '25 ", image: carousel1, link: "/category/" },
    { id: 2, name: "Day to Day Summer", image: carousel2, link: "/category/" },
    { id: 3, name: "1 Piece", image: carousel3, link: "/category/" },
    { id: 4, name: "2 Piece", image: carousel4, link: "/category/" },
    { id: 5, name: "3 Piece", image: carousel5, link: "/category/" },
    { id: 6, name: "Unstitched Bottoms", image: carousel6, link: "/category/" },
    { id: 7, name: "Karachi", image: carousel7, link: "/category/" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) setPerSlide(5);
      else if (width >= 1280) setPerSlide(4);
      else if (width >= 1024) setPerSlide(3);
      else if (width >= 768) setPerSlide(2);
      else if (width >= 640) setPerSlide(1.5);
      else setPerSlide(1.5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let id;
    const container = document.querySelector(".carousel-container");
    const pause = () => clearInterval(id);
    const resume = () => {
      id = setInterval(() => {
        setCurrentIndex((i) =>
          i + 1 + perSlide <= products.length ? i + 1 : 0
        );
      }, 3000);
    };

    resume();
    container?.addEventListener("mouseenter", pause);
    container?.addEventListener("mouseleave", resume);

    return () => {
      clearInterval(id);
      container?.removeEventListener("mouseenter", pause);
      container?.removeEventListener("mouseleave", resume);
    };
  }, [perSlide, products.length]);

  const prev = () => {
    setCurrentIndex((i) =>
      i > 0 ? i - 1 : Math.max(products.length - perSlide, 0)
    );
  };

  const next = () => {
    setCurrentIndex((i) => (i + perSlide < products.length ? i + 1 : 0));
  };

  const shiftPercent = (100 / products.length) * currentIndex;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 px-4 sm:px-8 lg:px-16">
      <h1 className="font-bold md:mt-0 mt-5 text-3xl sm:text-4xl lg:text-4xl xl:text-5xl tracking-widest text-center md:text-left">
        {heading}
      </h1>
      <div className="relative w-full overflow-hidden py-4 carousel-container">
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(products.length * 100) / perSlide}%`,
              transform: `translateX(-${shiftPercent}%)`,
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0 flex justify-center"
                style={{
                  width: `${100 / products.length}%`,
                  maxWidth: `${100 / perSlide}%`,
                }}
              >
                <div className="w-full px-2">
                  <SliderCard name={p.name} image={p.image} link={p.link} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          disabled={products.length <= perSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 opacity-80 hover:opacity-100 disabled:opacity-50 transition-opacity"
        >
          <IoIosArrowBack className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={next}
          disabled={products.length <= perSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 rotate-180 text-gray-400 opacity-80 hover:opacity-100 disabled:opacity-50 transition-opacity"
        >
          <IoIosArrowBack className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </div>
  );
};

export default HomePageCategorySlider;
