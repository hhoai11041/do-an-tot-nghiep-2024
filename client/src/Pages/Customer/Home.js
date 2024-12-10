/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import Footer from "../../Layouts/Footer";
import BannerSlider from "../../Layouts/Home/BannerSlider";
import VacationPoster from "../../Layouts/Hotel/VacationPoster";
import IntroduceCuisine from "../../Layouts/Home/IntroduceCuisine";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        {/* <Header></Header> */}
        <NavTravel></NavTravel>
        <div className="screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px]">
          <BannerSlider></BannerSlider>
        </div>
        <div className="screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto mb-10">
          <VacationPoster
            title="Điểm đến có khách sạn được yêu thích nhất"
            desc="Gợi ý những khách sạn phù hợp cho bạn"
          ></VacationPoster>
          <IntroduceCuisine></IntroduceCuisine>
        </div>
        <Footer></Footer>
      </div>
    </motion.div>
  );
};

export default Home;
