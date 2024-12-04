/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import SliderImages from "../../Components/SliderImages";
import Header from "../Header";
import NavTravel from "../Home/NavTravel";
import { getApi } from "../../API/GetApi";
import { useParams } from "react-router-dom";
import { Box, Rating, Tab, Tabs } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";
import RelatedHotels from "./RelatedHotels";
import ReviewHotel from "../Review/ReviewHotel";

const HotelInfoDetails = () => {
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const { slug, slugProvince } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [renderUI, setRenderUI] = useState(false);

  useEffect(() => {
    getApi.getApiHotelDetail(setData, slug, setLoading);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [slug, renderUI]);

  const slides =
    data && data.imageDetails?.map((url) => url.replace(/-100x100/, ""));

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <NavTravel />
      <div className="screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px] screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto mb-10">
        <h2 className="text-center text-2xl text-textPrimary font-bold mt-4">
          {data?.name}
        </h2>
        <div className="screenLarge:flex desktop:flex laptop:flex gap-10 mt-6">
          <div className="relative mt-6 screenLarge:w-[50%] desktop:w-[50%] laptop:w-[50%]">
            <SliderImages height="h-[50vh]" slides={slides}></SliderImages>
          </div>
          <div className="screenLarge:w-[50%] desktop:w-[50%] laptop:w-[50%] h-[50vh] screenLarge:mt-0 desktop:mt-0 laptop:mt-0 tablet:mt-[100px] mobile:mt-[150px]">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Thông tin" {...a11yProps(0)} />
                  <Tab label="Giới thiệu" {...a11yProps(1)} />
                  <Tab label="Tiện ích" {...a11yProps(1)} />
                  <Tab label="Google maps" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={1}>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="w-[80px]">Đánh giá: </strong>
                    <Rating
                      name="read-only"
                      value={data?.stars ?? 0}
                      readOnly
                    />
                    <div className="bg-green-600 w-16 text-center rounded-lg py-1 text-white font-bold">
                      {data?.stars?.toFixed(1)}
                    </div>

                    <p>({data?.numberOfReview} lượt đánh giá)</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <strong className="w-[80px]">Địa chỉ: </strong>
                    <div className="flex gap-2">
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </p>
                      <p>{data?.location?.address}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {data?.listIntroduce?.map((list, index) => (
                      <div
                        className="flex items-center gap-2 p-2 rounded-lg border bg-blue-100 dark:text-black"
                        key={index}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                        <p className="font-semibold">{list}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <div className="h-[50vh] overflow-y-scroll info_hotel_details">
                  <strong className="text-lg mb-4 block">
                    Tiện ích của {data?.name}
                  </strong>
                  <div className="grid grid-cols-3 gap-4">
                    {data?.facilities?.map((item, idex) => (
                      <li>{item}</li>
                    ))}
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={0}>
                <div className="h-[50vh] overflow-y-scroll info_hotel_details">
                  <strong className="text-lg mb-4 block">
                    Thông tin {data?.name}
                  </strong>
                  <div className="">
                    {data?.infoHotel?.map((item, idex) => (
                      <p className="mt-2 leading-9 text-justify">{item}</p>
                    ))}
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <div className="h-[53vh] overflow-y-scroll info_hotel_details">
                  <iframe
                    src={data?.urlMap}
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
        <div className="mt-[140px]">
          <ReviewHotel
            slug={slug}
            slugProvince={slugProvince}
            setRender={setRenderUI}
            render={renderUI}
          ></ReviewHotel>
        </div>

        <div className="mt-[100px]">
          <h2 className="text-2xl font-bold mb-10 text-textPrimary">
            Những khách sạn nổi bật nhất
          </h2>
          <RelatedHotels
            slugProvince={slugProvince}
            className="grid screenLarge:grid-cols-4 desktop:grid-cols-3 laptop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 gap-4 "
          ></RelatedHotels>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelInfoDetails;
