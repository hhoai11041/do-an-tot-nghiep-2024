import React, { useMemo, useState, useEffect } from "react";
import NavTravel from "../../Layouts/Home/NavTravel";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import OptionsSelect from "../../Components/OptionsSelect";
import { data } from "../../Data/data";
import RadioBox from "../../Components/RadioBox";
import CuisineItemFood from "../../Layouts/Cuisine/CuisineItemFood";
import { useParams, useNavigate } from "react-router-dom"; // Thay useHistory bằng useNavigate
import slugify from "react-slugify";
import { motion } from "framer-motion";

const CuisineAll = () => {
  const { slug } = useParams();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [valueSelectRegional, setValueSelectRegional] = useState("");
  const navigate = useNavigate();

  const dataProvince = useMemo(
    () => data.dataProvince.map((province) => province.province_name),
    []
  );

  useEffect(() => {
    if (slug) {
      const province = dataProvince.find(
        (province) => slugify(province) === slug
      );
      if (province) {
        setSelectedProvince(province);
      }
      if (slug === "tat-ca") setValueSelectRegional(slug);
      if (slug === "bac-bo") setValueSelectRegional("Bắc Bộ");
      if (slug === "trung-bo") setValueSelectRegional("Trung Bộ");
      if (slug === "nam-bo") setValueSelectRegional("Nam Bộ");
    }
  }, [slug, dataProvince]);

  // Khi chọn tỉnh thành thì reset vùng miền
  useEffect(() => {
    if (selectedProvince !== "") {
      setValueSelectRegional("");
      navigate(`/cuisine/all/${slugify(selectedProvince)}`);
    }
  }, [selectedProvince, navigate]);

  // Khi chọn vùng miền thì reset ô chọn tỉnh thành
  useEffect(() => {
    if (valueSelectRegional !== "") {
      setSelectedProvince("");
      navigate(`/cuisine/all/${slugify(valueSelectRegional)}`);
    }
  }, [valueSelectRegional, navigate]);

  const options = [
    { value: "tat-ca", label: "Tất cả vùng miền" },
    { value: "Bắc Bộ", label: "Ẩm thực Miền Bắc" },
    { value: "Trung Bộ", label: "Ẩm thực Miền Trung" },
    { value: "Nam Bộ", label: "Ẩm thực Miền Nam" },
  ];

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
        <div className="screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px] mb-6 screenLarge:flex desktop:flex laptop:flex gap-4">
          <div className="dark:border-gray-700 dark:border screenLarge:w-[25%] desktop:w-[25%] laptop:w-[25%] tablet:w-full screenLarge:h-[65vh] desktop:h-[65vh] laptop:h-[65vh] screenLarge:sticky desktop:sticky laptop:sticky top-[150px] rounded-lg p-4 border shadow-lg mb-6">
            <h2 className="text-[18px] font-semibold text-center">
              Lọc theo điểm đến
            </h2>
            <div className="cuisineListProvince mt-4 dark:border dark:border-gay-700 rounded-md">
              <OptionsSelect
                selectedValue={selectedProvince}
                setSelectedValue={setSelectedProvince}
                data={dataProvince}
                placeholder="Tỉnh thành..."
              />
            </div>
            <div className="mt-6">
              <RadioBox
                setValueRadioBox={setValueSelectRegional}
                valueRadioBox={valueSelectRegional}
                options={options}
              />
            </div>
          </div>
          <div className="screenLarge:w-[75%] desktop:w-[75%] laptop:w-[75%] tablet:w-full">
            <div>
              <CuisineItemFood
                slugProvince={slug}
                filterByRegion={valueSelectRegional}
                filterByProvince={selectedProvince}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default CuisineAll;
