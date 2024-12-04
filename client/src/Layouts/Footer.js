import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopesBulk,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="w-full bg-bgFooter dark:bg-bgThemeUI dark:border-t-[1px] dark:border-gray-700 relative z-20">
      <div className="screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] mobile:w-full mx-auto grid screenLarge:grid-cols-5 desktop:grid-cols-5 laptop:grid-cols-5 tablet:grid-cols-2 mobile:grid-cols-1 gap-10 text-white py-12 screenLarge:justify-start screenLarge:text-start desktop:justify-start desktop:text-start laptop:justify-start laptop:text-start tablet:justify-center tablet:text-center mobile:justify-center mobile:text-center">
        {/* Logo and Address Information */}
        <div className="screenLarge:col-span-2 desktop:col-span-2 laptop:col-span-2 tablet:col-span-1 text-[16px] font-medium relative screenLarge:px-0 desktop:px-0 laptop:px-0 tablet:px-0 mobile:px-6">
          <div className="absolute top-[-60px] screenLarge:left-0 screenLarge:translate-x-0 desktop:translate-x-0 desktop:left-0 laptop:translate-x-0 laptop:left-0 tablet:left-1/2 tablet:translate-x-[-50%] mobile:left-1/2 mobile:translate-x-[-50%]">
            <Logo className="w-[150px]" />
          </div>
          <div className="flex items-center gap-5 mt-20">
            <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-2xl text-green-500"
              />
            </div>
            <span className="w-[300px]">
              12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, Thành phố Hồ Chí Minh
            </span>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-2xl text-green-500"
              />
            </div>
            <span className="w-[300px]">0933024811 | 0396302580</span>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center">
              <FontAwesomeIcon
                icon={faEnvelopesBulk}
                className="text-2xl text-green-500"
              />
            </div>
            <div>
              <p className="w-[300px]">trungduong0810@gmail.com</p>
              <p className="w-[300px] mt-1">hhoai11041@gmail.com</p>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div>
          <h1 className="mb-3 uppercase">Về chúng tôi</h1>
          <div className="w-[50%] mx-auto h-[2px] screenLarge:mx-0 desktop:mx-0 laptop:mx-0 bg-white"></div>
          <div className="flex flex-col mt-7">
            <span className="py-2">
              <NavLink to="/">Trang chủ</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/introduce">Giới thiệu</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/news">Tin Tức</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/help">Liên hệ</NavLink>
            </span>
          </div>
        </div>

        {/* Customer Policies Section */}
        <div>
          <h1 className="mb-3 uppercase">Chính sách khách hàng</h1>
          <div className="w-[50%] mx-auto screenLarge:mx-0 desktop:mx-0 laptop:mx-0 h-[2px] bg-white"></div>
          <div className="flex flex-col mt-7">
            <span className="py-2">
              <NavLink>Điều khoản sử dụng</NavLink>
            </span>
            <span className="py-2">
              <NavLink>Chính sách bảo mật</NavLink>
            </span>
            <span className="py-2">
              <NavLink>Chính sách quy định</NavLink>
            </span>
          </div>
        </div>

        {/* Services Provided Section */}
        <div>
          <h1 className="mb-3 uppercase">Dịch vụ cung cấp</h1>
          <div className="w-[50%] mx-auto h-[2px] screenLarge:mx-0 desktop:mx-0 laptop:mx-0 bg-white"></div>
          <div className="flex flex-col mt-7">
            <span className="py-2">
              <NavLink to="/map-location">Bản đồ du lịch</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/tourist-attraction">
                Địa điểm du lịch Việt Nam
              </NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/cuisine">Đặc sản vùng miền</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/travelItinerary/AI">
                Gợi ý lịch trình du lịch
              </NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/hotel">Gợi ý khách sạn</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/ChatbotAI">Chatbox AI</NavLink>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-600"></div>
      <p className="text-center py-4 text-white font-semibold">
        <span>&copy; </span>
        <span>
          Bản quyền thuộc về{" "}
          <span className="text-teal-600">Trung Duong & Thanh Hoai</span>
        </span>
      </p>
    </div>
  );
};

export default Footer;
