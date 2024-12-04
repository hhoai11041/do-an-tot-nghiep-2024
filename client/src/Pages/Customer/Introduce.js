import React from "react";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import NavTravel from "../../Layouts/Home/NavTravel";
import { motion } from "framer-motion";

const Introduce = () => {
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
        {/* banner introduce  */}
        <div className="w-full relative mt-[130px] screenLarge:mt-[80px] desktop:mt-[80px] laptop:mt-[80px] mobile:mt-[150px]">
          <img
            className="w-full screenLarge:h-[50vh] desktop:h-[50vh] laptop:h-[50vh] mobile:h-[30vh]"
            src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1920,h_560,f_auto/v1683769499/eak9nggb8r9snmlj1get.png"
            alt=""
          />
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] tablet:w-[90%] mobile:w-full mx-auto">
            <h1 className="screenLarge:text-4xl desktop:text-4xl laptop:text-4xl mobile:text-[20px] font-bold text-white text-center tablet:text-3xl">
              Bạn đang tìm kiếm địa điểm du lịch?
            </h1>
            <p className="text-center screenLarge:mt-8 text-white screenLarge:text-2xl desktop:text-2xl laptop:text-2xl tablet:text-xl font-semibold mobile:text-[18px] mobile:mt-2">
              Chúng tôi sẽ gợi ý lộ trình cho bạn
            </p>
          </div>
        </div>
        {/* klook là gì  */}
        <div className="min-h-[400px] tablet:pt-4 mobile:pt-6 mobile:mb-6 flex items-center text-center w-full bg-slate-100 dark:bg-bgThemeUI">
          <div className="screenLarge:w-[70%] desktop:w-[70%]  laptop:w-[70%] tablet:w-[80%] mobile:w-[90%] m-auto">
            <h1 className="screenLarge:text-4xl desktop:text-4xl laptop:text-4xl tablet:text-2xl mobile:text-xl text-orange-600 font-semibold mb-8">
              Việt Nam Travel là gì?
            </h1>
            <strong className="screenLarge:text-[20px] desktop:text-[20px] laptop:text-[20px] tablet:text-[20px] mobile:text-[16px]">
              Việt Nam Travel là một nền tảng trực tuyến mang đến cho bạn sự
              tiện lợi và trải nghiệm hoàn hảo trong việc khám phá thế giới xung
              quanh mọi lúc, mọi nơi.
            </strong>
            <p className="mt-8 text-[18px] leading-8 text-start">
              Với Việt Nam Travel, việc tìm kiếm và gợi ý lịch trình cho các
              hoạt động thú vị chưa bao giờ dễ dàng hơn. Việt Nam Travel không
              chỉ dừng lại ở việc cung cấp và gợi ý các hoạt động du lịch phổ
              biến mà còn giúp bạn có những kế hoạch hoặc lịnh trình cụ thể để
              khám phá những trải nghiệm độc đáo và mới lạ.
            </p>

            <p className="mt-2 text-[18px] leading-8 text-start">
              Hãy để Việt Nam Travel trở thành người bạn đồng hành đáng tin cậy
              trong mọi chuyến đi của bạn, mang đến sự tiện nghi, dễ dàng và
              trọn vẹn trong việc tận hưởng từng khoảnh khắc của cuộc sống. Với
              Việt Nam Travel, mọi trải nghiệm đều trở nên dễ tiếp cận và thú vị
              hơn bao giờ hết.
            </p>
          </div>
        </div>
        {/* Sứ mệnh */}
        <div className="min-h-[400px] flex items-center text-center w-full relative">
          <img
            className="absolute"
            src="https://res.klook.com/image/upload/v1488362758/aboutus/mission-bg.png"
            alt=""
          />
          <div className="screenLarge:w-[70%] desktop:w-[70%]  laptop:w-[70%] tablet:w-[80%] mobile:w-[90%] m-auto z-10 dark:text-black">
            <h1 className="screenLarge:text-4xl desktop:text-4xl laptop:text-4xl tablet:text-2xl mobile:text-xl text-orange-600 font-semibold mb-8">
              Sứ mệnh
            </h1>
            <strong className="screenLarge:text-[20px] desktop:text-[20px] laptop:text-[20px] tablet:text-[20px] mobile:text-[16px]">
              Việt Nam Travel đưa bạn đến với hành trình du lịch Việt Nam thông
              qua những lộ trình và sự trải nghiệm của chúng tôi.
            </strong>
            <p className="mt-8 text-[18px] leading-8">
              Hãy để Việt Nam Travel dẫn dắt bạn đến những miền đất tuyệt đẹp
              của Việt Nam, nơi mỗi bước chân đều mở ra những trải nghiệm độc
              đáo và đầy màu sắc. Chúng tôi không chỉ mang đến cho bạn lịch
              trình cụ thể của những chuyến đi, mà còn là những câu chuyện sống
              động về văn hóa, ẩm thực và con người nơi đây.
            </p>
          </div>
        </div>
        {/* Cam kết  */}
        <div className="min-h-[400px] text-center bg-slate-100 dark:bg-bgThemeUI py-4">
          <div className="m-auto z-10">
            <h1 className="screenLarge:text-4xl desktop:text-4xl laptop:text-4xl tablet:text-2xl mobile:text-xl text-orange-600 font-semibold mb-8">
              Cam kết
            </h1>
            <div className="screenLarge:w-[85%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-[95%] mx-auto gap-4 grid screenLarge:grid-cols-3 default:grid-cols-3 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1">
              <div className="flex justify-center items-center flex-col">
                <img
                  src="https://res.klook.com/image/upload/q_85/f_auto/v1654513444/ued/platform/illustration_joy_of_discovery_xxxxxl.png"
                  alt=""
                  className="w-[100px] mb-4"
                />
                <strong className="text-[20px]">Tiện lợi & Nhanh chóng</strong>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Tìm hiểu, Lên kế hoạch, khám phá và tận hưởng - du lịch thật
                  dễ dàng và nhanh chóng với Việt Nam Travel.
                </p>
              </div>
              <div className="flex justify-center items-center flex-col">
                <img
                  src="https://res.klook.com/image/upload/q_85/f_auto/v1654513444/ued/platform/illustration_local_know_how__xxxxxl.png"
                  alt=""
                  className="w-[100px] mb-4"
                />
                <strong className="text-[20px]">
                  Du lịch như người bản địa
                </strong>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Việt Nam Travel nằm lòng các bí kíp ăn chơi của "thổ địa" tại
                  hàng nghìn điểm đến du lịch.
                </p>
              </div>
              <div className="flex justify-center items-center flex-col">
                <img
                  src="https://res.klook.com/image/upload/q_85/f_auto/v1654513444/ued/platform/illustration_Srelentless_curiosity__xxxxxl.png"
                  alt=""
                  className="w-[100px] mb-4"
                />
                <strong className="text-[20px]">
                  Khám phá & Trải nghiệm mới
                </strong>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Việt Nam Travel liên tục săn tìm các trải nghiệm mới mẻ và thú
                  vị dành cho bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </motion.div>
  );
};

export default Introduce;
