import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const SliderImages = ({ slides, height }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === slides?.length - 1 ? 0 : slide + 1);
  };
  const prevSlide = () => {
    setSlide(slide === 0 ? slides?.length - 1 : slide - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);
  if (!slides || slides?.length === 0) {
    return null;
  }
  return (
    <div className="flex justify-center items-center w-full rounded-lg group">
      <FontAwesomeIcon
        icon={faCircleChevronLeft}
        onClick={prevSlide}
        className="absolute text-3xl text-white hover:scale-110 transition-all cursor-pointer left-3 z-10 hidden group-hover:block"
      />
      {slides &&
        slides.map((item, index) => {
          return (
            <img
              loading="lazy"
              src={item}
              alt={item.alt}
              key={index}
              className={
                slide === index
                  ? `w-full ${height} overflow-hidden transition-all duration-1000 rounded-lg shadow-lg`
                  : `w-full  ${height} overflow-hidden transition-all duration-1000 absolute opacity-0 rounded-lg shadow-lg`
              }
            />
          );
        })}
      <FontAwesomeIcon
        icon={faCircleChevronRight}
        onClick={nextSlide}
        className="absolute text-3xl text-white hover:scale-110 transition-all cursor-pointer right-3 z-10 hidden group-hover:block"
      />
      <div className="screenLarge:flex desktop:flex laptop:flex tablet:flex mobile:flex screenLarge:flex-nowrap desktop:flex-nowrap laptop:flex-nowrap mobile:flex-wrap tablet:flex-wrap items-center justify-center gap-[10px] absolute bottom-[-75px] rounded-lg w-full whitespace-nowrap h-[50px]">
        {slides.map((item, index) => {
          return (
            <div
              key={index}
              className="relative w-[50px] h-[50px] inline-block"
            >
              <button
                key={index}
                className={
                  slide === index
                    ? "size-full overflow-hidden scale-125 transition-all"
                    : "size-full overflow-hidden overlay"
                }
              >
                <img
                  src={item}
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                />
              </button>
              <div
                onClick={() => setSlide(index)}
                className={`absolute w-full h-full bg-black inset-0 rounded-lg cursor-pointer ${
                  slide === index ? "opacity-0" : "opacity-75"
                }`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SliderImages;
