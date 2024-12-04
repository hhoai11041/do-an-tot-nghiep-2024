import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import ModalAdmin from "../../Configs/ModalAdmin";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getApi } from "../../API/GetApi";
import { Skeleton } from "@mui/material";
import amThucMienBac from "../../Assets/Images/am-thuc-mien-bac.jpg";
import amThucMienTrung from "../../Assets/Images/am-thuc-mien-trung.jpg";
import amThucMienNam from "../../Assets/Images/am-thuc-mien-nam.jpg";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BannerCuisine = () => {
  const [dataCuisine, setDatCuisine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIntroduceCuisine, setModalIntroduceCuisine] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getApi.getApiAllCuisineByProvince(setDatCuisine, setLoading);
  }, []);

  const renderIntroduceCuisine = () => {
    return (
      <div>
        <strong className="text-center text-xl block mb-4 text-textPrimary">
          Ẩm thực Việt Nam
        </strong>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} textColor="primary">
              <Tab label="Miền Bắc" {...a11yProps(0)} />
              <Tab label="Miền Trung" {...a11yProps(1)} />
              <Tab label="Miền Nam" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="screenLarge:flex desktop:flex laptop:flex tablet:flex gap-10 screenLarge:h-auto desktop:h-auto laptop:h-auto tablet:h-auto mobile:h-[60vh] mobile:overflow-y-scroll cuisineIntroduce">
              <img
                src={amThucMienBac}
                alt="Hình ảnh ẩm thực Miền Bắc"
                loading="lazy"
                className="screenLarge:size-[250px] desktop:size-[250px] laptop:size-[250px] tablet:size-[250px] rounded-md shadow-md object-cover"
              />
              <div className="screenLarge:mt-0 desktop:mt-0 laptop:mt-0 tablet:mt-0 mobile:mt-4">
                <p className="text-justify leading-7">
                  <strong>Ẩm thực miền Bắc Việt Nam</strong> được biết đến với
                  hương vị thanh nhẹ, tinh tế, không quá cay hay ngọt, mà thay
                  vào đó là sự cân bằng hoàn hảo giữa các vị tự nhiên. Những món
                  ăn nơi đây không chỉ ngon miệng mà còn đậm đà tính truyền
                  thống, mang theo hơi thở văn hóa và lối sống của con người Bắc
                  Bộ.
                </p>
                <p className="mt-3 text-justify leading-7">
                  Các món như phở, bún chả, chả cá Lã Vọng, bánh cuốn là những
                  món ăn được yêu thích. Hà Nội cũng là trung tâm của nhiều món
                  ăn truyền thống như cốm, bánh cốm, chả cá.
                </p>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="screenLarge:flex desktop:flex laptop:flex tablet:flex gap-10 screenLarge:h-auto desktop:h-auto laptop:h-auto tablet:h-auto mobile:h-[60vh] mobile:overflow-y-scroll cuisineIntroduce">
              <img
                src={amThucMienTrung}
                alt="Hình ảnh ẩm thực Miền Trung"
                loading="lazy"
                className="screenLarge:size-[250px] desktop:size-[250px] laptop:size-[250px] tablet:size-[250px] rounded-md shadow-md object-cover"
              />
              <div className="screenLarge:mt-0 desktop:mt-0 laptop:mt-0 tablet:mt-0 mobile:mt-4">
                <p className="text-justify leading-7">
                  <strong>Ẩm thực miền Trung Việt Nam</strong> nổi bật với hương
                  vị đậm đà và cay nồng, phản ánh sự khắc nghiệt của thiên nhiên
                  nơi đây. Các món ăn miền Trung thường có màu sắc rực rỡ, hấp
                  dẫn, với sự kết hợp hài hòa giữa các vị mặn, cay, ngọt, chua.
                </p>
                <p className="mt-3 text-justify leading-7">
                  Những món ăn như bún bò Huế, mì Quảng, bánh bèo, bánh nậm, và
                  bánh bột lọc không chỉ ngon miệng mà còn là niềm tự hào của
                  người dân nơi đây. Đặc biệt, ẩm thực cung đình Huế mang đậm
                  chất tinh tế, cầu kỳ, là biểu tượng của sự sang trọng và văn
                  hóa miền Trung.
                </p>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="screenLarge:flex desktop:flex laptop:flex tablet:flex gap-10 screenLarge:h-auto desktop:h-auto laptop:h-auto tablet:h-auto mobile:h-[60vh] mobile:overflow-y-scroll cuisineIntroduce">
              <img
                src={amThucMienNam}
                loading="lazy"
                alt="Hình ảnh ẩm thực Miền Nam"
                className="screenLarge:size-[250px] desktop:size-[250px] laptop:size-[250px] tablet:size-[250px] rounded-md shadow-md object-cover"
              />
              <div className="screenLarge:mt-0 desktop:mt-0 laptop:mt-0 tablet:mt-0 mobile:mt-4">
                <p className="text-justify leading-7">
                  <strong>Ẩm thực miền Nam Việt Nam</strong> mang đậm nét phóng
                  khoáng, tươi mới và hài hòa giữa các hương vị ngọt, béo, và
                  cay. Được thiên nhiên ưu đãi với nhiều loại nguyên liệu phong
                  phú, các món ăn miền Nam thường có vị ngọt đậm đặc trưng, thể
                  hiện rõ qua các món như cơm tấm, hủ tiếu, bánh xèo, và gỏi
                  cuốn.
                </p>
                <p className="mt-3 text-justify leading-7">
                  Ngoài ra, ẩm thực miền Nam còn nổi tiếng với các loại trái cây
                  nhiệt đới thơm ngon như xoài, măng cụt, sầu riêng. Tinh thần
                  cởi mở và sáng tạo của người dân miền Nam được thể hiện trọn
                  vẹn qua từng món ăn, làm nên sự đặc sắc và hấp dẫn riêng biệt
                  của vùng đất này.
                </p>
              </div>
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    );
  };

  return (
    <div className="relative screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] screenLarge:h-[60vh] desktop:h-[60vh] laptop:h-[60vh] tablet:h-[40vh] mobile:h-[50vh]">
      <img
        src="https://img.tastykitchen.vn/crop/1200x628/2020/09/14/tinhtuy1-8b4a.jpg"
        alt=""
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute top-[40%] left-1/2 translate-x-[-50%] translate-y-[-40%] screenLarge:w-[70%] desktop:w-[70%] laptop:w-[70%] tablet:w-[90%] mobile:w-[95%]">
        <div className="flex items-center justify-center gap-3">
          <h1 className="screenLarge:text-4xl desktop:text-4xl laptop:text-4xl tablet:text-3xl mobile:text-xl font-bold text-white">
            Khám phá & Thưởng thức
          </h1>
          <p
            onClick={() => setModalIntroduceCuisine(true)}
            className="cursor-pointer font-semibold screenLarge:text-4xl desktop:text-4xl laptop:text-4xl tablet:text-3xl text-textPrimary hover:text-white transition-all"
          >
            ẩm thực Việt Nam
          </p>
        </div>

        <p className="screenLarge:text-[20px] desktop:text-[20px] laptop:text-[20px] tablet:text-xl mobile:text-md font-semibold text-white mt-4 tracking-wide text-center">
          Hành trình ẩm thực độc đáo cùng những trải nghiệm vị giác tuyệt vời
        </p>
      </div>
      <div className="absolute bottom-[-40%] left-1/2 translate-x-[-50%] screenLarge:translate-y-[-50%] desktop:translate-y-[-50%] laptop:translate-y-[-50%] w-full screenLarge:block desktop:block laptop:block tablet:block mobile:hidden">
        <div className="screenLarge:h-auto screenLarge:overflow-visible desktop:h-auto desktop:overflow-visible laptop:h-auto laptop:overflow-visible tablet:h-[26vh] tablet:overflow-hidden grid screenLarge:grid-cols-7 desktop:grid-cols-7 laptop:grid-cols-7 tablet:grid-cols-4 gap-5 w-screenWidth mx-auto">
          {loading
            ? Array.from({ length: 7 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={250}
                />
              ))
            : dataCuisine
                .sort()
                .slice(0, 7)
                .map((item, index) => (
                  <NavLink
                    key={index}
                    to={`/cuisine/all/${slugify(item.provinceSlug)}`}
                    className="p-3 bg-white dark:text-black rounded-xl shadow-md text-center"
                  >
                    <img
                      src={item.imgRepresentative}
                      alt=""
                      className="w-full h-[17vh] rounded-xl object-cover"
                    />
                    <h2 className="font-semibold my-1">{item.provinceName}</h2>
                    <p className="text-[14px] ">{item.foodCount} món đặc sắc</p>
                  </NavLink>
                ))}
        </div>
      </div>

      <ModalAdmin
        openModal={modalIntroduceCuisine}
        setOpenModal={setModalIntroduceCuisine}
        children={renderIntroduceCuisine()}
        className="screenLarge:w-[60%] desktop:w-[60%] laptop:w-[70%] tablet:w-[80%] mobile:w-[90%] bg-white px-7 py-5 rounded-md screenLarge:h-[62vh] desktop:h-[62vh] laptop:h-[62vh] tablet:h-[62vh] mobile:h-[80vh]"
        overlayOpacity="opacity-60"
        isIconClose={true}
      ></ModalAdmin>
    </div>
  );
};

export default BannerCuisine;
