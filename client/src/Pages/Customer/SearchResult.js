import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import { useParams } from "react-router-dom";
import Footer from "../../Layouts/Footer";
import CuisineItemFood from "../../Layouts/Cuisine/CuisineItemFood";
import RadioBox from "../../Components/RadioBox";
import RelatedHotels from "../../Layouts/Hotel/RelatedHotels";
import SearchDestination from "../../Layouts/Destination/SearchDestination";
import slugify from "react-slugify";
import { motion } from "framer-motion";

const SearchResult = () => {
  const { slug } = useParams();
  const [location, setLocation] = useState("");
  const [valueChooseOption, setValueChooseOption] = useState("du-lich");

  const options = [
    { value: "du-lich", label: `Địa điểm du lịch` },
    { value: "dac-san", label: "Đặc sản" },
    { value: "khach-san", label: "Khách sạn" },
  ];

  useEffect(() => {
    const normalizedSlug = slug.trim().toLowerCase();

    if (
      normalizedSlug.includes("đặc sản") ||
      normalizedSlug.includes("ẩm thực") ||
      normalizedSlug.includes("món ăn") ||
      normalizedSlug.includes("ăn gì") ||
      normalizedSlug.includes("món ngon")
    ) {
      setValueChooseOption("dac-san");
    }

    if (
      normalizedSlug.includes("khách sạn") ||
      normalizedSlug.includes("hotel") ||
      normalizedSlug.includes("khu nghĩ dưỡng") ||
      normalizedSlug.includes("ở đâu")
    ) {
      setValueChooseOption("khach-san");
    }

    if (
      normalizedSlug.includes("địa điểm") ||
      normalizedSlug.includes("du lịch") ||
      normalizedSlug.includes("điểm đến")
    ) {
      setValueChooseOption("du-lich");
    }

    const locationMatch = normalizedSlug.match(
      /hà nội|hồ chí minh|đà nẵng|hải phòng|cần thơ|bắc ninh|bắc giang|bắc kạn|bạc liêu|bến tre|bình dương|bình định|bình phước|bình thuận|cà mau|cao bằng|đắk lắk|đắk nông|điện biên|đồng nai|đồng tháp|gia lai|hà giang|hà nam|hà tĩnh|hải dương|hậu giang|hòa bình|hưng yên|khánh hòa|kiên giang|kon tum|lai châu|lạng sơn|lào cai|lâm đồng|long an|nam định|nghệ an|ninh bình|ninh thuận|phú thọ|phú yên|quảng bình|quảng nam|quảng ngãi|quảng ninh|quảng trị|sóc trăng|sơn la|tây ninh|thái bình|thái nguyên|thanh hóa|thừa thiên huế|tiền giang|trà vinh|tuyên quang|vĩnh long|vĩnh phúc|yên bái|an giang|nha trang/
    );
    if (locationMatch) {
      setLocation(
        locationMatch[0].charAt(0).toUpperCase() + locationMatch[0].slice(1)
      );
    }
  }, [slug]);

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
        <div className="screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto screenLarge:mt-[130xp] laptop:mt-[130px] desktop:mt-[130px] mobile:mt-[150px] tablet:mt-[130px] pt-[20px] mb-6">
          <div className="screenLarge:flex desktop:flex laptop:flex gap-4">
            <div className="screenLarge:w-[25%] desktop:w-[25%] laptop:w-[25%] screenLarge:h-[65vh] desktop:h-[65vh] laptop:h-[65vh] screenLarge:sticky desktop:sticky laptop:sticky top-[150px] rounded-lg p-4 border shadow-lg mb-6">
              <h2 className="text-[18px] font-semibold text-center">
                Hoạt động khớp với {""}
                <span className="text-textPrimary">"{slug}"</span>
                <span className="w-[95%] mx-auto h-[2px] bg-bgPrimary block mt-6 rounded-lg"></span>
              </h2>
              <div className="mt-6">
                <RadioBox
                  setValueRadioBox={setValueChooseOption}
                  valueRadioBox={valueChooseOption}
                  options={options}
                />
              </div>
            </div>
            <div className="screenLarge:w-[75%] desktop:w-[75%] laptop:w-[75%]">
              {valueChooseOption && valueChooseOption === "dac-san" && (
                <div>
                  <CuisineItemFood
                    slugProvince={location}
                    filterByRegion={location}
                    filterByProvince={location}
                  />
                </div>
              )}

              {valueChooseOption && valueChooseOption === "khach-san" && (
                <div>
                  <RelatedHotels
                    slugProvince={slugify(location)}
                    className="grid screenLarge:grid-cols-3 desktop:grid-cols-3 laptop:grid-cols-3 tablet:grid-cols-2 gap-4"
                  ></RelatedHotels>
                </div>
              )}

              {valueChooseOption && valueChooseOption === "du-lich" && (
                <div>
                  <SearchDestination
                    slugProvince={slugify(location)}
                  ></SearchDestination>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default SearchResult;
