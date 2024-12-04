import React from "react";
import Header from "../../Layouts/Header";
import NavTravel from "../../Layouts/Home/NavTravel";
import Footer from "../../Layouts/Footer";
import Chatbot from "../../Layouts/ChatBotAI/Chatbot";
import { motion } from "framer-motion";
const ChatbotAI = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <Header></Header>
        <NavTravel></NavTravel>
        <div className="screenLarge:mt-[130px] desktop:mt-[130px] laptop:mt-[130px] tablet:mt-[130px] mobile:mt-[150px] pt-[20px] screenLarge:mb-10 desktop:mb-10 laptop:mb-10 screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto tablet:mb-[200px] mobile:mb-[150px]">
          <Chatbot></Chatbot>
        </div>
        <Footer></Footer>
      </div>
    </motion.div>
  );
};

export default ChatbotAI;
