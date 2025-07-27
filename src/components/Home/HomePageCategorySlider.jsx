// import React, { useEffect, useState, useRef } from "react";
// import SliderCard from "./SliderCard";
// import { IoIosArrowBack } from "react-icons/io";
// import axios from "axios";

// const HomePageCategorySlider = ({ heading }) => {
//   const [products, setProducts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [perSlide, setPerSlide] = useState(1);
//   const gapRem = 1;
//   const containerRef = useRef(null);

//   const getCollection = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://henza.zaffarsons.com/henza/Collection"
//       );
//        const activeProducts = data.filter(
//         (product) => product?.ACTIVE === "Y"
//       );
//       setProducts(activeProducts);
//     } catch (error) {
//       console.error("Error fetching collections:", error);
//     }
//   };

//   useEffect(() => {
//     getCollection();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (width >= 1536) setPerSlide(7);
//       else if (width >= 1280) setPerSlide(6);
//       else if (width >= 1024) setPerSlide(3);
//       else if (width >= 768) setPerSlide(2);
//       else setPerSlide(1);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (!containerRef.current || products.length === 0) return;
    
//     let id;
//     const pause = () => clearInterval(id);
//     const resume = () => {
//       id = setInterval(() => {
//         setCurrentIndex(prev => 
//           prev + 1 <= Math.ceil(products.length - perSlide) ? prev + 1 : 0
//         );
//       }, 3000);
//     };

//     resume();
//     containerRef.current.addEventListener("mouseenter", pause);
//     containerRef.current.addEventListener("mouseleave", resume);

//     return () => {
//       clearInterval(id);
//       containerRef.current?.removeEventListener("mouseenter", pause);
//       containerRef.current?.removeEventListener("mouseleave", resume);
//     };
//   }, [perSlide, products.length]);

//   const prev = () => {
//     setCurrentIndex(prev => 
//       prev > 0 ? prev - 1 : Math.max(products.length - perSlide, 0)
//     );
//   };

//   const next = () => {
//     setCurrentIndex(prev => 
//       prev + 1 <= Math.ceil(products.length - perSlide) ? prev + 1 : 0
//     );
//   };

//   // Calculate the percentage to shift
//   const shiftPercent = (100 / products.length) * currentIndex;

//   return (
//     <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 px-4 sm:px-8 lg:px-16">
     
//       <div 
//         ref={containerRef}
//         className="relative w-full overflow-hidden py-4 carousel-container"
//       >
//         <div className="overflow-hidden w-full">
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{
//               gap: `${gapRem}rem`,
//               transform: `translateX(calc(-${shiftPercent}% - ${currentIndex * gapRem}rem))`,
//             }}
//           >
//             {products.map((p) => (
//               <div
//                 key={p.id}
//                 className="flex-shrink-0 flex justify-center"
//                 style={{
//                   width: `calc(${100 / perSlide}% - ${gapRem}rem)`,
//                 }}
//               >
//                 <div className="w-full px-2 md:px-4">
//                   <SliderCard
//                     name={p.VALUE_SET_DESCRIPTION}
//                     image={p.image}
//                     link={p.link}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <button
//           onClick={prev}
//           disabled={products.length <= perSlide}
//           className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 opacity-80 hover:opacity-100 disabled:opacity-50 transition-opacity"
//         >
//           <IoIosArrowBack className="w-6 h-6 sm:w-8 sm:h-8" />
//         </button>
//         <button
//           onClick={next}
//           disabled={products.length <= perSlide}
//           className="absolute right-2 top-1/2 -translate-y-1/2 rotate-180 text-gray-400 opacity-80 hover:opacity-100 disabled:opacity-50 transition-opacity"
//         >
//           <IoIosArrowBack className="w-6 h-6 sm:w-8 sm:h-8" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HomePageCategorySlider;



import React, { useEffect, useState, useRef } from "react";
import SliderCard from "./SliderCard";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const HomePageCategorySlider = ({ heading }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(1);
  const gapRem = 1;
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);

  const getCollection = async () => {
    try {
      const { data } = await axios.get(
        "https://henza.zaffarsons.com/henza/Collection"
      );
      const activeProducts = data.filter(
        (product) => product?.ACTIVE === "Y"
      );
      setProducts(activeProducts);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) setPerSlide(7);
      else if (width >= 1280) setPerSlide(6);
      else if (width >= 1024) setPerSlide(5);
      else if (width >= 768) setPerSlide(3);
      else setPerSlide(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate slide width
  useEffect(() => {
    if (!containerRef.current || !sliderRef.current || perSlide === 0) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const gapPx = gapRem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const calculatedWidth = (containerWidth - (perSlide - 1) * gapPx) / perSlide;
    
    setSlideWidth(calculatedWidth);
  }, [perSlide, products.length]);

  // Auto slide effect
  useEffect(() => {
    if (!containerRef.current || products.length === 0 || perSlide >= products.length) return;
    
    let id;
    const pause = () => clearInterval(id);
    const resume = () => {
      id = setInterval(() => {
        setCurrentIndex(prev => 
          prev + 1 <= products.length - perSlide ? prev + 1 : 0
        );
      }, 3000);
    };

    resume();
    containerRef.current.addEventListener("mouseenter", pause);
    containerRef.current.addEventListener("mouseleave", resume);

    return () => {
      clearInterval(id);
      containerRef.current?.removeEventListener("mouseenter", pause);
      containerRef.current?.removeEventListener("mouseleave", resume);
    };
  }, [perSlide, products.length]);

  const prev = () => {
    setCurrentIndex(prev => 
      prev > 0 ? prev - 1 : products.length - perSlide
    );
  };

  const next = () => {
    setCurrentIndex(prev => 
      prev + 1 <= products.length - perSlide ? prev + 1 : 0
    );
  };

  // Calculate translation
  const translateValue = currentIndex * (slideWidth + gapRem * parseFloat(getComputedStyle(document.documentElement).fontSize));

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 px-4 sm:px-8 lg:px-16">
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden py-4"
      >
        <div className="overflow-hidden w-full">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: `${gapRem}rem`,
              transform: `translateX(-${translateValue}px)`,
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0"
                style={{
                  width: `${slideWidth}px`,
                }}
              >
                <div className="w-full">
                  <SliderCard
                    name={p.VALUE_SET_DESCRIPTION}
                    image={p.image}
                    link={p.link}
                  />
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