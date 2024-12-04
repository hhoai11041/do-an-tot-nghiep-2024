import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Components/Button";
import iconMap from "../Assets/Images/iconMap.png";
import iconTravel from "../Assets/Images/iconTravel.png";
import iconCuisine from "../Assets/Images/iconCuisine.png";
import iconHotel from "../Assets/Images/iconHotel.png";
import iconLichTrinh from "../Assets/Images/iconLichTrinh.png";
import iconLichTrinhAI from "../Assets/Images/iconLichTrinhAI.png";
import AIChatBot from "../Assets/Images/AIChatBot.png";

const listLink = [
  {
    id: 1,
    path: "/",
    title: "Trang chủ",
  },
  {
    id: 2,
    path: "/introduce",
    title: "Giới thiệu",
  },
  {
    id: 3,
    path: "/news",
    title: "Tin tức",
  },
  {
    id: 4,
    path: "/help",
    title: "Liên hệ",
  },
];
const listNavTravelMobile = [
  {
    id: 1,
    path: "/map-location",
    title: "Bản đồ",
    icon: iconMap,
  },
  {
    id: 2,
    path: "/destination",
    title: "Du lịch",
    icon: iconTravel,
  },
  {
    id: 3,
    path: "/cuisine",
    title: "Đặc sản",
    icon: iconCuisine,
  },
  {
    id: 4,
    path: "/hotel",
    title: "Khách sạn",
    icon: iconHotel,
  },

  {
    id: 5,
    path: "/travelItinerary/AI",
    title: "Lịch trình AI",
    icon: iconLichTrinhAI,
  },
  {
    id: 6,
    path: "/travelItinerary/tham-khao",
    title: "Lịch trình Việt Nam Travle",
    icon: iconLichTrinh,
  },
  {
    id: 7,
    path: "/ChatbotAI",
    title: "Chatbot AI",
    icon: AIChatBot,
  },
];

const NavConfig = ({ clickedBar, setModalSignUp, setModalSignIn }) => {
  const [isVisible, setIsVisible] = useState(clickedBar);

  // Trigger slide-out animation when clickedBar goes from true to false
  useEffect(() => {
    if (clickedBar) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 250); // Matches slideOut duration
      return () => clearTimeout(timeout);
    }
  }, [clickedBar]);

  return (
    <>
      <div className="w-full flex items-center justify-end desktop:gap-2 desktop:text-[16px] screenLarge:text-[16px] tablet:text-[14px] font-semibold screenLarge:flex desktop:flex laptop:flex tablet:hidden mobile:hidden">
        {listLink.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-textPrimary py-2 px-2"
                : "text-gray-400 hover:bg-slate-100 transition-all py-2 px-2 rounded-2xl"
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>

      {isVisible && (
        <div
          className={`fixed bg-white dark:bg-bgThemeUI inset-0 ${
            clickedBar ? "animate-slideIn" : "animate-slideOut"
          } screenLarge:hidden desktop:hidden laptop:hidden tablet:block mobile:block top-[78px] border dark:border dark:border-l-0 dark:border-r-0 dark:border-top-2 border-top-2`}
        >
          <div className="screenLarge:hidden desktop:hidden laptop:hidden tablet:hidden mobile:flex flex-col pt-4 justify-center z-40 w-full pb-8 dark:bg-bgThemeUI">
            <div className="grid grid-cols-4 w-[95%] mx-auto">
              {listNavTravelMobile.map((item) => (
                <div key={item.id} className="h-[70px]">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-textPrimary px-2 text-[12px]"
                        : "dark:hover:text-white transition-all px-4 rounded-2xl text-[12px]"
                    }
                  >
                    <div className="flex flex-col justify-center items-center">
                      <img
                        className="size-8 rounded-full"
                        src={item.icon}
                        alt=""
                      />
                      <p className="text-center">{item.title}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="px-6 py-4">
              {listLink.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-textPrimary py-2 px-2 block text-center"
                      : "text-gray-400 hover:bg-slate-100 transition-all py-2 px-2 rounded-2xl block text-center"
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-y-2 px-6">
              <Button
                onClick={() => setModalSignUp(true)}
                className="h-[40px] w-full dark:text-white text-center leading-[40px] rounded-2xl font-semibold text-[16px] hover:bg-slate-100 px-4 transition-all"
              >
                Đăng ký
              </Button>
              <Button
                onClick={() => setModalSignIn(true)}
                className="h-[40px] w-full  text-center leading-[40px] rounded-2xl px-4 font-semibold text-[16px] transition-all"
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavConfig;
