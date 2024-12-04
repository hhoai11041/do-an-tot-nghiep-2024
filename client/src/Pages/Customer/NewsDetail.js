import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import { useParams } from "react-router-dom";
import { getApi } from "../../API/GetApi";
import Footer from "../../Layouts/Footer";
import { loadingApp } from "../../Components/Loading";
import { motion } from "framer-motion";

const NewsDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getApi.getApiNewsById(setData, slug, setLoading);
  }, [slug]);
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
        <div className="screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px] screenLarge:w-[60%] desktop:w-[60%] laptop:w-[60%] tablet:w-[90%] mobile:w-[95%] mx-auto newsDetail mb-10 ">
          {loading ? (
            <div className="h-[100vh]">
              {loadingApp.loadingCircle(
                "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
              )}
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: data?.content,
              }}
            ></div>
          )}
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default NewsDetail;
