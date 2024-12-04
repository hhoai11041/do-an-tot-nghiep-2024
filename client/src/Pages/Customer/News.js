import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import LatestNews from "../../Layouts/News/LatestNews";
import NewsAndEvent from "../../Layouts/News/NewsAndEvent";
import Footer from "../../Layouts/Footer";
import TravelThroughPictures from "../../Layouts/News/TravelThroughPictures";
import { getApi } from "../../API/GetApi";
import slugify from "react-slugify";
import { motion } from "framer-motion";

const News = () => {
  const categoryNews1 = "Du lịch qua hình ảnh";
  const categoryNews2 = "Tin tức và sự kiện";
  const [loadingThroughPictures, setLoadingThroughPictures] = useState(false);
  const [loadingNewsEvent, setLoadingNewsEvent] = useState(false);

  const [dataNewsEvent, setDataNewsEvent] = useState([]);
  const [dataThroughPictures, setDataThroughPictures] = useState([]);
  useEffect(() => {
    getApi.getApiNewsByCategoryNews(
      setDataThroughPictures,
      slugify(categoryNews1),
      setLoadingThroughPictures
    );
  }, []);

  useEffect(() => {
    getApi.getApiNewsByCategoryNews(
      setDataNewsEvent,
      slugify(categoryNews2),
      setLoadingNewsEvent
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <Header></Header>
        <NavTravel />
        <div className="screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px] screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto mb-10">
          <LatestNews
            dataNewsEvent={dataNewsEvent}
            dataThroughPicture={dataThroughPictures}
          ></LatestNews>
          <NewsAndEvent
            data={dataNewsEvent}
            loading={loadingNewsEvent}
          ></NewsAndEvent>
          <TravelThroughPictures
            data={dataThroughPictures}
            loading={loadingThroughPictures}
          />
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default News;
