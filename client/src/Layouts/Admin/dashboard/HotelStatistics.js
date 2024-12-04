import React from "react";
import LineCharts from "../../../Components/LineCharts";

const HotelStatistics = ({ totalHotel, hotelStats }) => {
  const placeNames = hotelStats?.map((item) => item.placeName);
  const hotelCount = hotelStats?.map((item) => item.totalHotelItems);
  return (
    <div>
      <div className="w-full bg-slate-200 mt-6 p-4 rounded-md shadow-lg dark:bg-white">
        <div className="flex items-center gap-2 text-lg text-textPrimary">
          <h2 className="font-semibold">Thống kê khách sạn</h2>
          <strong className="">({totalHotel} địa điểm)</strong>
        </div>
        <div>
          <LineCharts
            label="Số lượng khách sạn"
            data={placeNames}
            dataCount={hotelCount}
            color="#324f7f"
          ></LineCharts>
        </div>
      </div>
    </div>
  );
};

export default HotelStatistics;
