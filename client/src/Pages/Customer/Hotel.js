import React from "react";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import VacationPoster from "../../Layouts/Hotel/VacationPoster";
import NavTravel from "../../Layouts/Home/NavTravel";
import FavoriteHotel from "../../Layouts/Hotel/FavoriteHotel";
import { motion } from "framer-motion";

const Hotel = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <Header></Header>
        <NavTravel></NavTravel>
        <div className="w-full relative screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px]">
          <img
            className="w-full h-[40vh] object-cover"
            src="https://res.klook.com/image/upload/v1688637267/UED_new/Hotel/Hotel_%E5%9E%82%E7%9B%B4%E9%A1%B5%E8%BF%AD%E4%BB%A3_2307/Banner_hotel_vertical-page.jpg"
            alt=""
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="screenLarge:w-[50%] desktop:w-[50%] laptop:w-[50%] tablet:w-[80%] mobile:w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center z-10">
            <h1 className="screenLarge:text-5xl desktop:text-5xl laptop:text-5xl tablet:text-4xl mobile:text-3xl font-bold text-white">
              Khách sạn
            </h1>
            <p className="mt-4 text-white screenLarge:text-2xl desktop:text-2xl laptop:text-2xl tablet:text-2xl mobile:text-xl font-semibold">
              Chúng tôi sẻ gợi ý cho bạn những khách sạn phù hợp nhất
            </p>
          </div>
        </div>
        <div className="screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto">
          <VacationPoster
            title="Điểm đến đang thịnh hành"
            desc="Các lựa chọn phổ biến nhất cho du khách du lịch"
          ></VacationPoster>
          <FavoriteHotel></FavoriteHotel>
        </div>
        <Footer></Footer>
      </div>
    </motion.div>
  );
};

export default Hotel;
