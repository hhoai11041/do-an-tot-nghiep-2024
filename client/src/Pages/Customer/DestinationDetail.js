/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import SliderImages from "../../Components/SliderImages";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import { getApi } from "../../API/GetApi";
import { useParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Layouts/Footer";
import DestinationList from "../../Layouts/Destination/DestinationList";
import Star from "../../Components/Star";
import ReviewDestination from "../../Layouts/Review/ReviewDestination";
import NotFoundData from "../../Components/NotFoundData";
import { loadingApp } from "../../Components/Loading";
import { motion } from "framer-motion";

const DestinationDetail = () => {
  const { slug } = useParams();
  const [destination, setDestination] = useState();
  const [similarDestinations, setSimilarDestinations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [renderUI, setRenderUI] = useState(false);

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

  useEffect(() => {
    const decodedName = decodeURIComponent(slug).replace(/-/g, " ");
    getApi.apiGetDestinationByName(
      decodedName,
      (data) => {
        if (data && data.destination) {
          setDestination(data.destination);
        }
      },
      setLoading
    );
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [slug, renderUI]);

  useEffect(() => {
    if (destination) {
      const province =
        destination?.location?.address?.split(",")?.pop()?.trim() || "";

      getApi.apiGetDestinations(
        setSimilarDestinations,
        setLoading,
        1,
        setTotalPages,
        province,
        destination._id,
        4
      );
    }
  }, [destination]);

  const slides = Array.isArray(destination?.images)
    ? destination.images.map((url) => url.replace(/-100x100/, ""))
    : [];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <div className="mt-[130px] pt-[20px] screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto mb-10">
          <h2 className="text-center text-2xl text-textPrimary font-bold mt-4">
            {destination?.name}
          </h2>
          <div className="screenLarge:flex desktop:flex laptop:flex  gap-10 mt-6">
            <div className="relative mt-6 screenLarge:w-[50%] desktop:w-[50%] laptop:w-[50%]">
              <SliderImages height="h-[50vh]" slides={slides}></SliderImages>
            </div>
            <div className="screenLarge:w-[50%] desktop:w-[50%] laptop:w-[50%] h-[50vh] screenLarge:mt-0 desktop:mt-0 laptop:mt-0 tablet:mt-[100px] mobile:mt-[100px]">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Thông tin" {...a11yProps(0)} />
                    <Tab label="Giới thiệu" {...a11yProps(1)} />
                    <Tab label="Hoạt động" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={1}>
                  <div>
                    <div className="screenLarge:flex desktop:flex laptop:flex tablet:flex items-center gap-2">
                      <strong className="w-[80px]">Đánh giá: </strong>
                      <div className="flex justify-center items-center gap-4">
                        <Star value={destination?.rating?.toFixed(1) ?? 0} />
                        <div className="bg-green-600 w-16 text-center rounded-lg py-1 text-white font-bold">
                          {destination?.rating?.toFixed(1)}
                        </div>
                        <p className="text-green-600 font-semibold">
                          ({destination?.rating_count} lượt đánh giá)
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 screenLarge:flex desktop:flex laptop:flex tablet:flex gap-2">
                      <strong className="w-[80px]">Địa chỉ: </strong>
                      <div className="flex gap-2">
                        <p>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </p>
                        <p>{destination?.location?.address}</p>
                      </div>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div className="h-[50vh] overflow-y-scroll info_hotel_details">
                    <strong className="text-lg mb-4 block">
                      Hoạt động tại {destination?.name}
                    </strong>
                    <div className="grid screenLarge:grid-cols-3 desktop:grid-cols-3 laptop:grid-cols-3 tablet:grid-cols-3 mobile:grid-cols-1 gap-4">
                      {destination?.activities?.map((item, idex) => (
                        <li>{item}</li>
                      ))}
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={0}>
                  <div className="h-[50vh] overflow-y-scroll info_hotel_details">
                    <strong className="text-lg mb-4 block">
                      Thông tin {destination?.name}
                    </strong>
                    <div className="">
                      <p className="mt-2 leading-9 text-justify">
                        {destination?.description}
                      </p>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <div className="h-[53vh] overflow-y-scroll info_hotel_details">
                    <iframe
                      src={destination?.urlMap}
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

          <div className="screenLarge:mt-[100px] desktop:mt-[100px] laptop:mt-[100px] tablet:mt-[10px] mobile:mt-[20px]">
            <ReviewDestination
              destinationId={destination?._id}
              slug={slug}
              render={renderUI}
              setRender={setRenderUI}
            ></ReviewDestination>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-10 text-textPrimary ">
              Những Địa điểm tương tự
            </h2>
            <div className="relative min-h-[100px]">
              {loading ? (
                loadingApp.loadingCircle(
                  "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] "
                )
              ) : similarDestinations.length > 0 ? (
                <DestinationList destinations={similarDestinations} />
              ) : (
                <NotFoundData></NotFoundData>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </motion.div>
  );
};

export default DestinationDetail;
