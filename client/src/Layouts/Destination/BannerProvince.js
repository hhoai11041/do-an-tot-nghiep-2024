import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BannerDestination = ({ provinces, destinations, onSelectProvince }) => {
  const provinceList = [
    {
      id: "all",
      province: "Tất cả",
      image:
        "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "",
    },
    ...provinces.map((province) => ({
      id: province.id,
      province: province.title,
      image:
        province.image ||
        "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: province.name,
    })),
  ];

  return (
    <div className="relative">
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
            1280: {
              slidesPerView: 8,
            },
          }}
        >
          {provinceList.map((item) => (
            <SwiperSlide
              key={item.id}
              className="bg-white dark:bg-bgThemeUI border-gray-400 text-center cursor-pointer hover:scale-[0.9] transition-all relative"
              onClick={() =>
                onSelectProvince(
                  item.province === "Tất cả" ? null : item.province
                )
              }
            >
              <div className="">
                <img
                  src={item.image}
                  alt={item.province}
                  className="w-full h-[180px] object-cover rounded-md"
                />
                <h2 className="text-white font-lobster font-semibold my-2 text-lg absolute top-[40%] left-[50%] translate-x-[-50%]">
                  {item.province}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerDestination;
