import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import MensWearSliderAndBasicCard from "./MensWearSliderAndBasicCard";

const LargeCardSlider = ({heading,products}) => {
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(1);

  // Enhanced responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) setPerSlide(5); // 2xl screens
      else if (width >= 1280) setPerSlide(5); // xl
      else if (width >= 1024) setPerSlide(2); // lg
      else if (width >= 768) setPerSlide(1.45); // md
      else if (width >= 640) setPerSlide(1.45); // sm
      else setPerSlide(1); // xs
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance with pause on hover
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
    <div className="relative overflow-hidden py-10 carousel-container">
      <h2 className="text-3xl font-semibold mb-6 px-6">{heading}</h2>
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out pb-3"
          style={{
            width: `${(products.length * 100) / perSlide}%`,
            transform: `translateX(-${shiftPercent}%)`,
          }}
        >
          {products.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 flex justify-center"
              style={{ width: `${100 / products.length}%` }}
            >
              <MensWearSliderAndBasicCard index={index} item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Navigation Buttons */}
      <button
        onClick={prev}
        disabled={products.length <= perSlide}
        className="absolute bg-white border p-2 border-gray-300 rounded-full flex justify-center items-center left-0 sm:left-[90px] top-1/2 -translate-y-1/2 text-gray-400 opacity-80 hover:opacity-100 disabled:opacity-50 transition-opacity"
      >
        <IoIosArrowBack className="w-6 h-6 sm:w-6 sm:h-6" color="black" />
      </button>
      <button
        onClick={next}
        disabled={products.length <= perSlide}
        className="absolute bg-white border p-2 border-gray-300 rounded-full flex justify-center items-center right-2 sm:right-[100px] top-1/2 -translate-y-1/2 rotate-180 text-gray-400 opacity-80 hover:opacity-100 disabled:opacity-50 transition-opacity"
      >
        <IoIosArrowBack className="w-6 h-6 sm:w-6 sm:h-6" color="black" />
      </button>
    </div>
  );
};

export default LargeCardSlider;
