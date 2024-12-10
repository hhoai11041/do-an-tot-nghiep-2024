import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import SliderImages from "../../Components/SliderImages";
import Footer from "../../Layouts/Footer";
import { getApi } from "../../API/GetApi";
import Skeleton from "@mui/material/Skeleton";
import { motion } from "framer-motion";

const CuisineDetailFood = () => {
  const { foodId } = useParams();
  const [dataFood, setDataFood] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getApi.getApiFoodById(setDataFood, foodId, setLoading);
  }, [foodId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        {/* <Header /> */}
        <NavTravel />
        <div className="screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] screenLarge:mt-[130px] desktop:pt-[20px] desktop:mt-[130px] laptop:pt-[20px] laptop:mt-[130px] tablet:pt-[20px] tablet:mt-[130px] screenLarge:pt-[20px] w-screenWidth mx-auto mb-[100px] mobile:mt-[170px]">
          {loading ? (
            <>
              <Skeleton
                variant="text"
                width="50%"
                height={100}
                className="mb-4 m-auto"
              />
              <div className="grid grid-cols-1 screenLarge:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-1 gap-10">
                <Skeleton variant="rectangular" height="55vh" />
                <div>
                  <Skeleton variant="text" height="10vh" />
                  <Skeleton variant="text" height="10vh" />
                  <Skeleton variant="text" height="20vh" />
                  <Skeleton variant="text" height="15vh" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-[85%] mx-auto">
              <h1 className="text-center text-[25px] font-bold mb-6 text-textPrimary">
                {dataFood?.foodName}
              </h1>
              <div className="grid grid-cols-1 screenLarge:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-1 gap-10">
                <div className="relative">
                  {dataFood?.listImage ? (
                    <SliderImages
                      slides={dataFood.listImage}
                      height="h-[50vh]"
                    />
                  ) : (
                    <p>No images available.</p>
                  )}
                </div>
                <div className="leading-8 screenLarge:mt-0 desktop:mt-0 laptop:mt-0 tablet:mt-16 mobile:mt-16 h-[50vh] overflow-y-scroll detailFood">
                  <p className="text-justify">{dataFood?.foodDesc}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </motion.div>
  );
};

export default CuisineDetailFood;
