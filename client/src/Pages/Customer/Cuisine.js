import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import BannerCuisine from "../../Layouts/Cuisine/BannerCuisine";
import Footer from "../../Layouts/Footer";
import CuisineRegional from "../../Layouts/Cuisine/CuisineRegional";
import { getApi } from "../../API/GetApi";
import { motion } from "framer-motion";

const Cuisine = () => {
  const [dataFoodNorth, setDataFoodNorth] = useState();
  const [dataFoodSouth, setDataFoodSouth] = useState();
  const [dataFoodCentral, setDataFoodCentral] = useState();

  const [totalPageNorth, setTotalPageNorth] = useState();
  const [totalPageSouth, setTotalPageSouth] = useState();
  const [totalPageCentral, setTotalPageCentral] = useState();

  const [loadingNorth, setLoadingNorth] = useState(false);
  const [loadingSouth, setLoadingSouth] = useState(false);
  const [loadingCentral, setLoadingCentral] = useState(false);

  let pageNumber = 1;
  let regionalNorth = "Bắc bộ";
  let regionalSouth = "Nam bộ";
  const regionalCentral = "Trung bộ";

  useEffect(() => {
    getApi.getApiFoodByRegion(
      setDataFoodNorth,
      regionalNorth,
      setLoadingNorth,
      pageNumber,
      setTotalPageNorth
    );
  }, [regionalNorth, pageNumber]);

  useEffect(() => {
    getApi.getApiFoodByRegion(
      setDataFoodSouth,
      regionalSouth,
      setLoadingSouth,
      pageNumber,
      setTotalPageSouth
    );
  }, [regionalSouth, pageNumber]);

  useEffect(() => {
    getApi.getApiFoodByRegion(
      setDataFoodCentral,
      regionalCentral,
      setLoadingCentral,
      pageNumber,
      setTotalPageCentral
    );
  }, [regionalCentral, pageNumber]);

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
        <div>
          <BannerCuisine />
        </div>
        <div className="screenLarge:w-[85%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[180px] mobile:mt-[15px] screenLarge:mt-[130px] screenLarge:pt-[20px] desktop:pt-[20px] laptop:pt-[20px]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="screenLarge:text-2xl desktop:text-2xl laptop:text-2xl tablet:text-2xl mobile:text-xl font-semibold  text-textPrimary">
              Trải nghiệm ẩm thực không thể bỏ lỡ
            </h1>
          </div>

          {/* Miền Bắc */}
          <div className="mb-8">
            <CuisineRegional
              data={dataFoodNorth}
              title="Ẩm thực miền Bắc"
              className="bg-[#fff7f0]"
              loading={loadingNorth}
            ></CuisineRegional>
          </div>

          {/* Miền Trung */}
          <div className="mb-8">
            <CuisineRegional
              data={dataFoodCentral}
              title="Ẩm thực miền Trung"
              className="bg-[#f9f0f0]"
              loading={loadingCentral}
            ></CuisineRegional>
          </div>

          {/* Miền Nam */}
          <div className="mb-8">
            <CuisineRegional
              data={dataFoodSouth}
              title="Ẩm thực miền Nam"
              className="bg-[#e6f5f7]"
              loading={loadingSouth}
            ></CuisineRegional>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Cuisine;
