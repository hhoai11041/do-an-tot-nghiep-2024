import React from "react";
import SliderFade from "../../Components/SliderFade";

const slides = [
  {
    url: "https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-tay-ninh-cover.jpeg",
  },
  {
    url: "https://image1.voh.com.vn/vohdata/default/2024/07/03/beauty-scene-3908224-1280_20240703133947.jpg",
  },
  {
    url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_1920,/v1677452120/banner/me34ue7nso33vynwpypb.webp",
  },
];

const BannerSlider = () => {
  return (
    <div className="relative screenLarge:h-[60vh] desktop:h-[60vh] laptop:h-[60vh] tablet:h-[40vh] mobile:h-[50vh]">
      <SliderFade dataSlide={slides} bgOverlay="opacity-40"></SliderFade>
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%] mx-auto op">
        <h1 className="screenLarge:text-5xl desktop:text-5xl laptop:text-4xl tablet:text-3xl mobile:text-2xl font-bold uppercase text-white z-10">
          Du lịch trọn niềm vui
        </h1>
        <p className="mt-4 text-white screenLarge:text-xl desktop:text-xl laptop:text-xl tablet:text-xl screenLarge:block desktop:block laptop:block tablet:block mobile:hidden font-semibold">
          Khám phá niềm vui của bạn mọi lúc, mọi nơi - từ chuyến du lịch ngẫu
          hứng tới những cuộc phiêu lưu khắp đất nước
        </p>
        <p className="mt-4 text-white screenLarge:hidden desktop:hidden laptop:hidden tablet:hidden mobile:block mobile:text-sm font-semibold">
          Khám phá niềm vui của bạn mọi lúc, mọi nơi.
        </p>
      </div>
    </div>
  );
};

export default BannerSlider;
