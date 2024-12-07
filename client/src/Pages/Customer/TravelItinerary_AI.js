import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import { data } from "../../Data/data";
import OptionsSelect from "../../Components/OptionsSelect";
import RadioBox from "../../Components/RadioBox";
import Button from "../../Components/Button";
import Footer from "../../Layouts/Footer";
import { getApi } from "../../API/GetApi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadingApp } from "../../Components/Loading";
import iconAI from "../../Assets/Images/iconAI.png";
import { toast } from "react-toastify";
import { announce } from "../../Components/ModalAnnounce";
import { motion } from "framer-motion";
import useStore from "../../Zustand/store";

const TravelItinerary_AI = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [valueSelectRegional, setValueSelectRegional] = useState("");
  const [itinerary, setItinerary] = useState();
  const [loading, setLoading] = useState(false);
  // const [dataUser, setDataUser] = useState();
  const dataUser = useStore((state) => state.dataUser);

  // useEffect(() => {
  //   getApi.getApiUser(setDataUser);
  // }, []);

  const dataProvince = useMemo(
    () => data.dataProvince.map((province) => province.province_name),
    []
  );

  const options = [
    { value: "Trong ngày", label: "Lịch trình trong ngày" },
    { value: "2 ngày 1 đêm", label: "Lịch trình 2 ngày 1 đêm" },
    { value: "3 ngày 2 đêm", label: "Lịch trình 3 ngày 2 đêm" },
    { value: "4 ngày 3 đêm", label: "Lịch trình 4 ngày 3 đêm" },
  ];

  const handleGenerateItinerary = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyB_GwNbd9XwtLw_MzCYClDaExF3uVyNiBU"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Gợi ý lịch trình du lịch tại ${selectedProvince} ${valueSelectRegional} với thời gian, địa điểm, địa điểm quán ăn, tên nơi đến, tên khách sạn, địa chỉ khách sạn, tên khu vui chơi giải trí, địa chỉ khu vui chơi,, rõ ràng và chi tiết ngay trong từng buổi đi.`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      setItinerary(responseText);
    } catch (error) {
      console.error("Lỗi khi tạo lộ trình:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItinerary = (itinerary) => {
    if (!itinerary) return null;

    const processedItinerary = itinerary
      .replace(/[*#]/g, "")
      .split("\n")
      .map((line, index) => {
        if (
          line.includes("Ngày 1") ||
          line.includes("Ngày 2") ||
          line.includes("Ngày 3") ||
          line.includes("Ngày 4") ||
          line.includes("Ngày 5") ||
          line.includes("Ngày 6") ||
          line.includes("1.") ||
          line.includes("2.")
        ) {
          return (
            <div key={index} className="bg-slate-200 p-2 rounded-md">
              <h2 className="text-lg font-bold text-textPrimary leading-8">
                {line.trim()}
              </h2>
            </div>
          );
        }

        if (
          line.includes("Buổi sáng") ||
          line.includes("Sáng") ||
          line.includes("Buổi trưa") ||
          line.includes("Trưa") ||
          line.includes("Buổi chiều") ||
          line.includes("Chiều") ||
          line.includes("Buổi tối") ||
          line.includes("Tối") ||
          line.includes("Khách sạn:") ||
          line.includes("Khách sạn khác:") ||
          line.includes("Khu vui chơi giải trí:") ||
          line.includes("Các địa điểm tham quan") ||
          line.includes(
            "Ngoài ra, bạn có thể tham khảo thêm các điểm du lịch khác"
          )
        ) {
          return (
            <div key={index} className="my-2 ml-5">
              <h3 className="text-md font-semibold dark:text-textPrimary leading-8">
                {line.trim()}
              </h3>
            </div>
          );
        }

        if (line.includes("Lưu ý")) {
          return (
            <div key={index} className="bg-slate-200 p-2 rounded-md mt-4 ">
              <h2 className="text-lg font-bold text-textPrimary leading-8">
                {line.trim()}
              </h2>
            </div>
          );
        }

        if (
          line.includes("Lịch trình du lịch") ||
          line.includes("Gợi ý lịch trình du lịch") ||
          line.includes("Du lịch") ||
          line.includes("Lịch Trình Du Lịch")
        ) {
          return (
            <div key={index} className="mb-6 leading-8">
              <h2 className="text-xl font-bold text-textPrimary text-center uppercase">
                {line.trim()}
              </h2>
            </div>
          );
        }

        if (
          line.includes("Chúc bạn có chuyến du lịch") ||
          line.includes("Chúc bạn có một chuyến du lịch")
        ) {
          return (
            <div key={index} className="my-6 leading-8">
              <h2 className="text-xl font-bold text-textPrimary text-center uppercase">
                {line.trim()}
              </h2>
            </div>
          );
        }
        if (line.includes("Nơi ở") || line.includes("Lưu trú")) {
          return (
            <div key={index} className="hidden">
              {line.trim()}
            </div>
          );
        }

        return (
          <div key={index} className="my-2 ml-12 text-justify leading-8">
            <p>{line.trim()}</p>
          </div>
        );
      });

    return <div>{processedItinerary}</div>;
  };

  useEffect(() => {
    if (loading) {
      setItinerary("");
    }
  }, [loading]);

  const handleCreateItinerary = (e) => {
    e.preventDefault();
    if (!selectedProvince) {
      toast.error("Vui lòng chọn điểm đến của bạn");
    } else if (!valueSelectRegional) {
      toast.error("Vui lòng thời gian cụ thể");
    } else {
      handleGenerateItinerary();
    }
  };

  useEffect(() => {
    if (!dataUser) {
      announce.showErrorModal(
        "Đăng nhập",
        "Vui lòng đăng nhập tài khoản để sử dụng tính năng này"
      );
    }
  }, [dataUser]);

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
        {dataUser ? (
          <div className="screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px] screenLarge:mb-10 desktop:mb-10 laptop:mb-10 screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto tablet:mb-[200px] mobile:mb-[150px]">
            <div className="screenLarge:flex desktop:flex laptop:flex justify-between gap-6">
              <form
                onSubmit={handleCreateItinerary}
                className="dark:border-gray-700 dark:border screenLarge:w-[25%] desktop:w-[25%] laptop:w-[25%] screenLarge:h-[75vh] desktop:h-[75vh]  laptop:h-[75vh]  screenLarge:sticky laptop:sticky desktop:sticky top-[150px] rounded-lg p-4 border shadow-lg screenLarge:mb-0 desktop:mb-0 laptop:mb-0 tablet:mb-6 mobile:mb-4"
              >
                <h2 className="text-[18px] font-semibold text-center">
                  Lịch trình theo điểm đến
                </h2>
                <div className="cuisineListProvince mt-4 dark:border-gray-700 dark:border rounded-md">
                  <OptionsSelect
                    selectedValue={selectedProvince}
                    setSelectedValue={setSelectedProvince}
                    data={dataProvince}
                    placeholder="Chọn đểm đến của bạn..."
                  />
                </div>
                <div className="mt-6">
                  <RadioBox
                    setValueRadioBox={setValueSelectRegional}
                    valueRadioBox={valueSelectRegional}
                    options={options}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-bgPrimary h-[50px] leading-[50px] rounded-md text-white font-bold mt-4"
                >
                  Tạo lịch trình
                </Button>
              </form>
              <div className="screenLarge:w-[75%] desktop:w-[75%] laptop:w-[75%] relative shadow-lg">
                <div>
                  <div className="w-full">
                    {itinerary ? (
                      <div className="screenLarge:px-10 desktop:px-10 laptop:px-10 tablet:px-2 mobile:px-2 py-4 border rounded-lg">
                        {renderItinerary(itinerary)}
                      </div>
                    ) : (
                      <div className="h-[75vh] w-full relative rounded-lg overflow-hidden dark:border-gray-700 dark:border">
                        <div className="absolute inset-0 bg-black dark:bg-slate-950 opacity-70 "></div>
                        <img
                          src="https://img4.thuthuatphanmem.vn/uploads/2020/06/05/hinh-nen-cong-nghe-3d-dep_103227852.png"
                          alt=""
                          className="w-full h-full"
                        />
                        <div className="text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%]">
                          <div className="">
                            <div className="flex justify-center">
                              <img
                                src={iconAI}
                                alt=""
                                className="screenLarge:w-[30%] desktop:w-[30%] laptop:w-[30%] tablet:w-[30%] mobile:w-[60%]"
                              />
                            </div>

                            {loading ? (
                              <div className="relative mt-[40px]">
                                {loadingApp.loadingCircle(
                                  "absolute top-[0%] left-1/2 translate-x-[-50%] translate-y-[-100%] z-[50]"
                                )}
                                <h2 className="text-white text-xl font-bold pt-3">
                                  AI đang tạo lịch trình. Vui lòng đợi trong
                                  giây lát...
                                </h2>
                              </div>
                            ) : (
                              <div className="text-center">
                                <h2 className="screenLarge:text-3xl desktop:text-3xl laptop:text-3xl tablet:text-3xl mobile:text-2xl font-bold text-white">
                                  Bạn đang tìm kiếm địa điểm du lịch?
                                </h2>
                                <p className="mt-4 text-white screenLarge:text-xl desktop:text-xl laptop:text-xl tablet:text-xl font-semibold">
                                  Tôi sẽ gợi ý lịch trình chi tiết cho bạn
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="screenLarge:mt-[130px] desktop:mt-[150px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px]  screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto mb-10 screenLarge:h-[70vh] desktop:h-[80vh] laptop:h-[80vh] shadow-lg border dark:border-gray-700 rounded-lg grid screenLarge:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2  items-center justify-center gap-10 screenLarge:px-20 desktop:px-20 laptop:px-20 tablet:px-20 mobile:px-6 pb-4">
            <div className="flex justify-center items-center">
              <img
                src="https://i.pinimg.com/736x/cb/16/ae/cb16ae2bcaff37a3c6214b4a4e1052a4.jpg"
                alt=""
                className="w-full h-[60vh]"
              />
            </div>
            <div className="text-justify">
              <strong className="text-center screenLarge:text-3xl desktop:text-3xl laptop:text-3xl tablet:text-3xl mobile:text-2xl font-bold block mb-6 uppercase chatbotAI">
                Gợi ý Lịch trình Du lịch AI
              </strong>
              <h2 className="screenLarge:text-xl desktop:text-lg laptop:text-lg leading-10 font-semibold">
                Tính năng này giúp người dùng tạo ra những lịch trình du lịch
                phù hợp, dựa trên sở thích và điểm đến mong muốn. Khi đăng nhập,
                bạn có thể:
              </h2>
              <ul className="mt-4 screenLarge:text-[18px] desktop:text-[17px] laptop:text-lg">
                <li className="screenLarge:mb-4">
                  Tạo lịch trình du lịch cá nhân với sự hỗ trợ của AI, giúp bạn
                  lựa chọn các địa điểm, hoạt động và thời gian hợp lý.
                </li>
                <li className="mb-4">
                  Nhận gợi ý chi tiết về các địa điểm du lịch, ẩm thực và các
                  hoạt động đặc sắc tại từng tỉnh thành.
                </li>
                <li className="mb-4">
                  Tối ưu hóa lịch trình dựa trên các yếu tố như thời gian, sở
                  thích và khu vực du lịch.
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

export default TravelItinerary_AI;
