import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarCheck,
  faCloudMeatball,
  faCompass,
  faHotel,
  faImage,
  faNewspaper,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DashboardStatistics = ({
  adminCount,
  customerCount,
  newsEventCount,
  newsTravelImageCount,
  totalFood,
  totalItinerary,
  totalHotelItems,
  totalDestination,
}) => {
  const dataDashboardStatistics = [
    {
      id: 1,
      icon: faUser,
      title: "Người dùng",
      totalNumber: customerCount,
      bgLabel: "bg-blue-800",
      bgTotalNumber: "bg-blue-900",
    },
    {
      id: 2,
      icon: faUser,
      title: "Quản trị viên",
      totalNumber: adminCount,
      bgLabel: "bg-green-800",
      bgTotalNumber: "bg-green-900",
    },
    {
      id: 3,
      icon: faNewspaper,
      title: "Tin tức và sự kiện",
      totalNumber: newsEventCount,
      bgLabel: "bg-purple-800",
      bgTotalNumber: "bg-purple-900",
    },
    {
      id: 4,
      icon: faImage,
      title: "Du lịch hình ảnh",
      totalNumber: newsTravelImageCount,
      bgLabel: "bg-orange-800",
      bgTotalNumber: "bg-orange-900",
    },
    {
      id: 5,
      icon: faCloudMeatball,
      title: "Đặc sản",
      totalNumber: totalFood && totalFood,
      bgLabel: "bg-yellow-800",
      bgTotalNumber: "bg-yellow-900",
    },
    {
      id: 5,
      icon: faCalendarCheck,
      title: "Lịch trình",
      totalNumber: totalItinerary && totalItinerary,
      bgLabel: "bg-pink-800",
      bgTotalNumber: "bg-pink-900",
    },
    {
      id: 6,
      icon: faCompass,
      title: "Địa điểm du lịch",
      totalNumber: totalDestination && totalDestination,
      bgLabel: "bg-teal-800",
      bgTotalNumber: "bg-teal-900",
    },
    {
      id: 6,
      icon: faHotel,
      title: "Khách sạn",
      totalNumber: totalHotelItems && totalHotelItems,
      bgLabel: "bg-pink-400",
      bgTotalNumber: "bg-pink-500",
    },
  ];
  return (
    <div>
      <div className="w-full grid grid-cols-4 gap-4 text-white ">
        {dataDashboardStatistics.map((item, index) => (
          <div
            key={index}
            className={`${item.bgTotalNumber} rounded-sm overflow-hidden h-[120px]`}
          >
            <div className="flex items-center">
              <div
                className={`w-[50%] ${item.bgLabel} p-2 py-4 flex flex-col justify-between items-center h-[120px]`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="size-10 text-white"
                />
                <h2 className="text-sm font-semibold uppercase mt-2 text-center">
                  {item.title}
                </h2>
              </div>
              <strong className="w-[50%] text-center block text-3xl">
                {item.totalNumber}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStatistics;
