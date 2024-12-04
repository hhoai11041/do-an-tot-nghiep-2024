import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const SliderFade = ({ dataSlide, bgOverlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? dataSlide.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === dataSlide.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);
  return (
    <div className="w-full h-full mx-auto relative group">
      <div className={`absolute inset-0 bg-black opacity-0 ${bgOverlay}`}></div>
      <div
        onClick={prevSlide}
        className="absolute top-1/2 left-5 translate-y-[-50%] cursor-pointer hidden group-hover:block hover:scale-110 duration-200"
      >
        <FontAwesomeIcon
          icon={faCircleChevronLeft}
          className="size-7 text-white"
        />
      </div>
      <div
        style={{ backgroundImage: `url(${dataSlide[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>
      <div
        onClick={nextSlide}
        className="absolute top-1/2 right-5 translate-y-[-50%] cursor-pointer hidden group-hover:block hover:scale-110 duration-200"
      >
        <FontAwesomeIcon
          icon={faCircleChevronRight}
          className="size-7 text-white"
        />
      </div>
      <div className="absolute left-1/2 translate-x-[-50%] bottom-3 flex gap-2 justify-center ">
        {dataSlide.map((item, index) => (
          <div
            onClick={() => goToSlide(index)}
            key={index}
            className={`size-[10px] rounded-full cursor-pointer ${
              currentIndex === index ? "bg-orange-700" : "bg-white"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SliderFade;
