import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { NavLink, useNavigate } from "react-router-dom";
import slugify from "react-slugify";
import { loadingApp } from "../../Components/Loading";
import iconCuisineRegional from "../../Assets/Images/iconCuisineRegional.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const CuisineRegional = ({ data, title, className, loading }) => {
  const navigate = useNavigate();
  return (
    <div className={`py-4 px-6 ${className} rounded-md`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-4">
          <img
            src={iconCuisineRegional}
            alt=""
            className="size-10 rounded-lg"
          />
          <h1 className="text-xl dark:text-black font-semibold my-4">
            {title}
          </h1>
        </div>
        <div
          onClick={() => navigate("/cuisine/all/tat-ca")}
          className="flex items-center gap-2 cursor-pointer group "
        >
          <strong className="font-semibold text-textPrimary text-[16px] transition-all underline">
            Xem tất cả
          </strong>
          <FontAwesomeIcon
            icon={faAnglesRight}
            className="size-4 text-textPrimary transition-all"
          />
        </div>
      </div>

      {loading ? (
        loadingApp.skeletonFoodRegion()
      ) : data?.length === 0 ? (
        <h1>Không có dữ liệu</h1>
      ) : (
        <Swiper
          style={{ zIndex: 0, paddingBottom: "40px" }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={15}
          slidesPerView={5}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log()}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {data?.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{
                zIndex: 1,
                background: "white",
                backgroundColor: "white",
                borderRadius: "12px",
              }}
            >
              <div className="">
                <div className="">
                  <NavLink
                    key={index}
                    to={`/cuisine/detail/${slugify(item.provinceName)}/${
                      item.foodId
                    }`}
                  >
                    <div className="relative shadow-md rounded-lg overflow-hidden pb-3 cursor-pointer">
                      <img
                        src={item.imgFood}
                        alt={item.foodName}
                        className="w-full h-[25vh] object-cover"
                      />
                      <div className="w-full h-[25vh] bg-black absolute top-0 opacity-20"></div>

                      <div className="p-2">
                        <h2 className="text-[18px] font-bold dark:text-black h-[50px] flex items-center">
                          {item.foodName}
                        </h2>
                        <p className="text-sm dark:text-black leading-6 line-clamp-2 mt-1">
                          {item.foodDesc}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="px-4 py-1 bg-bgPrimary rounded-md text-white opacity-90 text-[14px]">
                            <p>{item.provinceName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CuisineRegional;
