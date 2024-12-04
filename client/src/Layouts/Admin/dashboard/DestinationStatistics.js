import React from "react";
import BarCharts from "../../../Components/BarCharts";

const DestinationStatistics = ({ data, count }) => {
  return (
    <div>
      <div className="w-full bg-slate-200 mt-6 p-4 rounded-md shadow-lg dark:bg-white">
        <h2 className="text-black font-semibold text-lg mb-2">
          Thống kê địa điểm du lịch ({count} địa điểm)
        </h2>
        <div>
          <BarCharts data={data}></BarCharts>
        </div>
      </div>
    </div>
  );
};

export default DestinationStatistics;
