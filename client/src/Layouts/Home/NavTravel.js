import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import InputText from "../../Components/InputText";

const listNavTravel = [
  {
    id: 1,
    path: "/map-location",
    title: "Bản đồ",
    icon: <FontAwesomeIcon icon={faLocationDot} className="mr-2" />,
  },
  {
    id: 2,
    path: "/destination",
    title: "Điểm du lịch",
  },
  {
    id: 3,
    path: "/cuisine",
    title: "Đặc sản vùng miền",
  },
  {
    id: 4,
    path: "/hotel",
    title: "Khách sạn",
  },
  {
    id: 5,
    path: "/travelItinerary",
    title: "Lịch trình",
    content: (
      <div className="flex flex-col px-2">
        <NavLink
          to="/travelItinerary/AI"
          className="hover:text-textPrimary h-[40px] leading-[40px] transition-all"
        >
          Lịch trình AI
        </NavLink>
        <NavLink
          to="/travelItinerary/tham-khao"
          className="hover:text-textPrimary h-[40px] leading-[40px] transition-all"
        >
          Tham khảo cùng Việt Nam Travel
        </NavLink>
      </div>
    ),
    disabled: true,
  },
  {
    id: 4,
    path: "/ChatbotAI",
    title: "Chatbot AI",
  },
];

const NavTravel = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredItem(id);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      <div className="screenLarge:flex desktop:flex laptop:flex tablet:flex mobile:hidden fixed top-[80px] z-40 w-full h-[50px] shadow-md dark:shadow-sm dark:shadow-stone-700 flex items-center justify-center bg-white dark:bg-bgThemeUI">
        <div className="flex justify-center items-center font-medium text-slate-900 dark:text-textThemeUI relative">
          {listNavTravel.map((item) => (
            <div
              key={item.id}
              className="relative navTravel"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-textPrimary h-[40px] leading-[40px] px-2 py-2"
                    : "hover:bg-slate-100 dark:hover:text-black transition-all h-[40px] leading-[40px] px-4 py-2 rounded-2xl"
                }
              >
                {item.icon && item.icon}
                {item.title}
              </NavLink>
              {item.disabled && (
                <div className="w-full h-[40px] bg-transparent absolute top-0"></div>
              )}

              {item.content && hoveredItem === item.id && (
                <div
                  className={`absolute top-[45px] left-0 min-w-[280px] bg-white dark:bg-bgThemeUI shadow-lg dark:border-gray-700 dark:border border-gray-200 border rounded-lg 
                transition-all duration-300 ease-in-out transform ${
                  hoveredItem === item.id
                    ? "opacity-100 translate-y-0 z-10"
                    : "opacity-0 -translate-y-2"
                }`}
                >
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="screenLarge:hidden desktop:hidden laptop:hidden tablet:hidden mobile:flex flex-col py-4 justify-center fixed top-[79px] z-40 w-full bg-white shadow-md dark:bg-bgThemeUI">
        <InputText
          placeholder="Tìm kiếm theo địa điểm, hoạt động..."
          className="mobile:block mx-auto"
        ></InputText>
      </div>
    </>
  );
};

export default NavTravel;
