import React, { useState } from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import SearchDataHotel from "../../Layouts/Hotel/SearchDataHotel";
import HotelItem from "../../Layouts/Hotel/HotelItem";
import { useParams } from "react-router-dom";
import Footer from "../../Layouts/Footer";
import RadioBox from "../../Components/RadioBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const HotelDetails = () => {
  const { slug } = useParams();
  const [valueStarHotels, setValueStarHotels] = useState("");
  const numberStars =
    Number(valueStarHotels) > 0 ? Number(valueStarHotels) : "";
  const options = [
    { value: "", label: "Tất cả khách sạn" },
    {
      value: "5",
      label: (
        <span>
          Khách sạn 5
          <FontAwesomeIcon icon={faStar} className="ml-2" />
        </span>
      ),
    },
    {
      value: "4",
      label: (
        <span>
          Khách sạn 4
          <FontAwesomeIcon icon={faStar} className="ml-2" />
        </span>
      ),
    },
    {
      value: "3",
      label: (
        <span>
          Khách sạn 3
          <FontAwesomeIcon icon={faStar} className="ml-2" />
        </span>
      ),
    },
    {
      value: "2",
      label: (
        <span>
          Khách sạn 2
          <FontAwesomeIcon icon={faStar} className="ml-2" />
        </span>
      ),
    },
    {
      value: "1",
      label: (
        <span>
          Khách sạn 1
          <FontAwesomeIcon icon={faStar} className="ml-2" />
        </span>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <Header />
        <NavTravel />
        <div className="screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px] mb-6 screenLarge:flex desktop:flex laptop:flex gap-4">
          <div className="dark:border-gray-700 dark:border desktop:w-[25%] screenLarge:w-[25%] laptop:w-[25%] screenLarge:h-[65vh] desktop:h-[70vh] laptop:h-[65vh] screenLarge:sticky desktop:sticky laptop:sticky top-[150px] rounded-lg p-4 border shadow-lg screenLarge:mb-0 desktop:mb-0 laptop:mb-0 tablet:mb-6 mobile:mb-4">
            <h2 className="text-[18px] font-semibold text-center">
              Lọc theo điểm đến
            </h2>
            <div className="cuisineListProvince mt-4 mb-4">
              <SearchDataHotel></SearchDataHotel>
            </div>
            <RadioBox
              setValueRadioBox={setValueStarHotels}
              valueRadioBox={valueStarHotels}
              options={options}
            />
          </div>
          <div className="desktop:w-[75%] screenLarge:w-[75%] laptop:w-[65%]">
            <HotelItem province={slug} numberStars={numberStars}></HotelItem>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default HotelDetails;
