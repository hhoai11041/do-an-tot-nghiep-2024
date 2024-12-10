import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import { data } from "../../Data/data";
import OptionsSelect from "../../Components/OptionsSelect";
import RadioBox from "../../Components/RadioBox";
import Footer from "../../Layouts/Footer";
import { getApi } from "../../API/GetApi";
import slugify from "react-slugify";
import NotFoundData from "../../Components/NotFoundData";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton từ Material UI
import { announce } from "../../Components/ModalAnnounce";
import lichTrinhThamKhao from "../../Assets/Images/lich-trinh-tham-khao.jpg";
import { motion } from "framer-motion";

const TravelItinerary = () => {
  const [dataItinerary, setDataItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [valueSelectItinerary, setValueSelectItinerary] = useState("");
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    const { promise, abort } = getApi.getApiUser(setDataUser);
  
    promise
      .then((data) => {
        setIsLoadingUser(false);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch user:", error);
        setIsLoadingUser(false);
      });
  
    return () => abort();
  }, []);

  const dataProvince = useMemo(
    () => data.dataProvince.map((province) => province.province_name),
    []
  );

  const dataOption =
    dataItinerary &&
    dataItinerary[0]?.itineraryDetail
      ?.filter((item) => item)
      .map((i) => i.timeTrip);

  const options = dataOption
    ? dataOption.map((item) => ({
        value: item,
        label: `Lịch trình ${item}`,
      }))
    : [];

  useEffect(() => {
    if (selectedProvince) {
      setLoading(true);
      getApi.getApiTravelItineraryByProvince(
        setDataItinerary,
        slugify(selectedProvince),
        setLoading
      );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (dataOption && dataOption.length > 0 && selectedProvince) {
      setValueSelectItinerary(dataOption[0]);
    }
  }, [selectedProvince]);

  const dataFilterByItinerary =
    dataItinerary &&
    dataItinerary[0]?.itineraryDetail.filter(
      (item) => item.timeTrip === valueSelectItinerary
    );

    useEffect(() => {
      if (!isLoadingUser && !dataUser) {
        announce.showErrorModal(
          "Đăng nhập",
          "Vui lòng đăng nhập tài khoản để sử dụng tính năng này"
        );
      }
  }, [dataUser, isLoadingUser]);

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-center">
          <p className="text-xl">Đang tải dữ liệu người dùng...</p>
        </div>
      </div>
    );
  }

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
        {dataUser ? (
          <div className="screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px] screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto mb-10">
            <div className="screenLarge:flex desktop:flex laptop:flex justify-between gap-10">
              <div className="dark:border-gray-700 dark:border screenLarge:w-[25%] desktop:w-[25%] laptop:w-[25%] max-h-[75vh] screenLarge:sticky laptop:sticky desktop:sticky top-[150px] rounded-lg p-4 border shadow-lg screenLarge:mb-0 desktop:mb-0 laptop:mb-0 tablet:mb-6 mobile:mb-4">
                <h2 className="text-[18px] font-semibold text-center">
                  Lịch trình theo điểm đến
                </h2>
                <div className="cuisineListProvince mt-4 dark:border-gray-700 dark:border rounded-md">
                  <OptionsSelect
                    selectedValue={selectedProvince}
                    setSelectedValue={setSelectedProvince}
                    data={dataProvince}
                    placeholder="Chọn tỉnh thành..."
                  />
                </div>
                <div className="mt-6">
                  <RadioBox
                    setValueRadioBox={setValueSelectItinerary}
                    valueRadioBox={valueSelectItinerary}
                    options={options}
                  />
                </div>
              </div>
              <div className="screenLarge:w-[75%] desktop:w-[75%] laptop:w-[75%] relative shadow-lg ">
                {loading ? (
                  <div className="h-[75vh] w-full relative rounded-sm overflow-hidden">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : !selectedProvince && dataItinerary.length === 0 ? (
                  <div className="h-[75vh] w-full relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-black dark:bg-gray-700 opacity-50 "></div>
                    <img
                      src="https://viettour3mien.vn/wp-content/uploads/2023/02/tau-queen-cruise-ha-long.jpg"
                      alt="Không có lịch trình"
                      className="w-full h-full object-cover"
                    />
                    <div className="text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%]">
                      <h2 className="text-3xl font-bold text-white">
                        Bạn đang tìm kiếm địa điểm du lịch?
                      </h2>
                      <p className="mt-4 text-white text-xl font-semibold">
                        Chúng tôi sẽ gợi ý lịch trình chi tiết cho bạn
                      </p>
                    </div>
                  </div>
                ) : dataItinerary &&
                  dataFilterByItinerary &&
                  dataFilterByItinerary.length !== 0 ? (
                  <div className="travel_itinerary screenLarge:px-10 desktop:px-10 laptop:px-10 tablet:px-2 mobile:px-4 border dark:border-gray-700 dark:border rounded-lg">
                    <div
                      className="w-full p-4"
                      dangerouslySetInnerHTML={{
                        __html: dataFilterByItinerary[0]?.content,
                      }}
                    />
                  </div>
                ) : (
                  <NotFoundData />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="screenLarge:mt-[150px] desktop:mt-[150px] laptop:mt-[150px] tablet:mt-[150px] mobile:mt-[170px] pt-[20px] screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto mb-10 screenLarge:h-[70vh] desktop:h-[80vh] laptop:h-[80vh]  shadow-lg border rounded-lg grid screenLarge:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2  items-center justify-center gap-10 screenLarge:px-20 desktop:px-20 laptop:px-20 tablet:px-20 mobile:px-6 pb-4">
            <div className="flex justify-center items-center">
              <img src={lichTrinhThamKhao} alt="" className="w-full h-[60vh]" />
            </div>
            <div className="text-justify">
              <strong className="text-center screenLarge:text-3xl desktop:text-3xl laptop:text-3xl tablet:text-3xl mobile:text-2xl font-bold block mb-6 uppercase chatbotAI">
                Lịch trình du lịch Việt Nam Travel
              </strong>
              <h2 className="screenLarge:text-xl desktop:text-lg laptop:text-lg leading-10 font-semibold">
                Tính năng này mang đến cho bạn có thể tham khảo lịch trình du
                lịch từ Việt Nam Travel
              </h2>
              <ul className="mt-4 screenLarge:text-[18px] desktop:text-[17px] laptop:text-lg">
                <li className="screenLarge:mb-4">
                  Gợi ý thông tin du lịch cho từng khu vực, giúp bạn có thêm
                  những lựa chọn hay và độc đáo để khám phá.
                </li>
                <li className="mb-4">
                  Gợi ý chi tiết về các địa điểm du lịch, ẩm thực và các hoạt
                  động đặc sắc tại từng tỉnh thành.
                </li>
              </ul>
              <h2 className="mt-6 screenLarge:text-xl desktop:text-lg laptop:text-lg leading-10 font-semibold">
                Đăng nhập tài khoản để trải nghiệm đầy đủ các tính năng và nhận
                được gợi ý từ hệ thống!
              </h2>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </motion.div>
  );
};

export default TravelItinerary;
