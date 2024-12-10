/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import NavTravel from "../../Layouts/Home/NavTravel";
import FormContact from "../../Layouts/Contact/FormContact";
import { motion } from "framer-motion";

const Help = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        {/* <Header></Header> */}
        <NavTravel></NavTravel>
        <div className="w-full relative screenLarge:mt-[130xp] laptop:mt-[130px] desktop:mt-[130px] mobile:mt-[150px] tablet:mt-[130px]">
          <img
            className="w-full screenLarge:h-[20vh] desktop:h-[20vh] laptop:h-[20vh] mobile:h-[20vh]"
            src="https://static.vecteezy.com/system/resources/previews/014/300/735/non_2x/blue-and-white-abstract-background-design-well-use-as-wallpaper-website-template-background-purpose-free-vector.jpg"
            alt=""
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] screenLarge:w-[80%] desktop:w-[80%] tablet:w-[90%] mobile:w-full mx-auto">
            <h1 className="screenLarge:text-4xl desktop:text-4xl laptop:text-4xl mobile:text-[20px] font-bold text-white text-center tablet:text-3xl">
              Bạn đang cần hổ trợ?
            </h1>
            <p className="text-center screenLarge:mt-8 text-white screenLarge:text-xl desktop:text-lg laptop:text-lg tablet:text-lg mobile:text-[18px] mobile:mt-2">
              Rất hân hạnh được hỗ trợ bạn. Hãy để lại thông tin cho chúng tôi
              nhé! Yêu cầu của bạn sẽ được xử lý và phản hồi trong thời gian sớm
              nhất.
            </p>
          </div>
        </div>
        <div className="screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto screenLarge:flex desktop:flex laptop:flex my-7 gap-4">
          <div className="min-h-[60vh] screenLarge:w-[40%] desktop:w-[40%] laptop:w-[40%] tablet:w-full rounded-lg shadow-lg dark:border-gray-700 dark:border border mb-6">
            <FormContact></FormContact>
          </div>
          <div className="screenLarge:w-[60%] desktop:w-[60%] laptop:w-[60%] tablet:w-full h-[77vh] rounded-lg overflow-hidden shadow-lg">
            <div className="h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858169091082!2d106.68427047570354!3d10.822164158347038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1730218214737!5m2!1svi!2s"
                width="100%"
                height="100%"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </motion.div>
  );
};

export default Help;
