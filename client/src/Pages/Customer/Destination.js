import React, { useState, useEffect } from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import Footer from "../../Layouts/Footer";
import BannerProvince from "../../Layouts/Destination/BannerProvince";
import DestinationList from "../../Layouts/Destination/DestinationList";
import provinces from "../../Data/province.json";
import { getApi } from "../../API/GetApi";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";

const Destination = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDestinations = () => {
    getApi.apiGetDestinations(
      setDestinations,
      setLoading,
      currentPage,
      setTotalPages,
      selectedProvince,
      "",
      12
    );
  };

  useEffect(() => {
    fetchDestinations();
    console.log(selectedProvince);
  }, [currentPage, selectedProvince]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 700,
      behavior: "smooth",
    });
  };

  const handleSelectProvince = (province) => {
    setSelectedProvince(province);
    setCurrentPage(1);
  };

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
          <div className="relative screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] screenLarge:h-[60vh] desktop:h-[60vh] laptop:h-[60vh] tablet:h-[40vh] mobile:h-[50vh] ">
            <img
              src="https://www.anhdulich.vn/storage/sliders/ha-long-bay-copy.jpg"
              alt=""
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute top-[40%] left-1/2 translate-x-[-50%] translate-y-[-40%] screenLarge:w-[70%] desktop:w-[70%] laptop:w-[70%] tablet:w-[90%] mobile:w-[95%]">
              <div className="flex items-center justify-center gap-3">
                <h1 className="screenLarge:text-4xl desktop:text-4xl laptop:text-4xl tablet:text-3xl mobile:text-xl font-bold text-white">
                  Du lịch & Trải nghiệm
                </h1>
              </div>

              <p className="screenLarge:text-[22px] desktop:text-[20px] laptop:text-[20px] tablet:text-xl mobile:text-md font-semibold text-white mt-4 tracking-wide text-center">
                Khám phá niềm vui của bạn mọi lúc, mọi nơi
              </p>
            </div>
            <div className="absolute bottom-[-40%] left-1/2 translate-x-[-50%] screenLarge:translate-y-[-50%] desktop:translate-y-[-50%] laptop:translate-y-[-50%] w-full">
              <div className="screenLarge:h-auto screenLarge:overflow-visible desktop:h-auto desktop:overflow-visible laptop:h-auto laptop:overflow-visible tablet:h-[26vh] tablet:overflow-hidden grid screenLarge:grid-cols-7 desktop:grid-cols-7 laptop:grid-cols-7 tablet:grid-cols-4 gap-5 w-screenWidth mx-auto"></div>
            </div>
          </div>

          <div className="z-20 relative screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto mb-10">
            <div className="destination_province relative text-center py-8">
              <h1 className="text-4xl font-bold text-[#FF5B00] uppercase p-2 bg-white dark:bg-bgThemeUI relative z-30">
                điểm đến nổi bật
              </h1>
            </div>
            <BannerProvince
              provinces={provinces}
              destinations={destinations}
              onSelectProvince={handleSelectProvince}
            />
            <div className="py-8">
              <h2 className="text-3xl font-bold mb-6">Điểm du lịch</h2>
              <DestinationList destinations={destinations} loading={loading} />
            </div>

            <div className="flex justify-center mt-4">
              <Stack spacing={2} className="mb-4">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="secondary"
                  variant="outlined"
                  shape="rounded"
                  className="dark:text-white"
                />
              </Stack>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </motion.div>
  );
};

export default Destination;
