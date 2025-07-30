import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MensWearSliderAndBasicCard from "./MensWearSliderAndBasicCard";
import Footer from "../Footer/Footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RelatedGridStructure = ({ heading, data }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-8 md:px-12 w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">{heading}</h2>
          {isDesktop && (
            <div className="flex space-x-3">
              <button className="related-slider-prev rounded-full bg-white border border-gray-300 p-2 hover:bg-gray-100 transition">
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button className="related-slider-next rounded-full bg-white border border-gray-300 p-2 hover:bg-gray-100 transition">
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          )}
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: ".related-slider-prev",
            nextEl: ".related-slider-next",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="mySwiper"
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <MensWearSliderAndBasicCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Footer />
    </>
  );
};

export default RelatedGridStructure;
