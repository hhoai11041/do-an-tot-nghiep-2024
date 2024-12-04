import React from "react";
import PieCharts from "../../../Components/PieCharts";

const NewsStatistics = ({ newsEventCount, newsTravelImageCount }) => {
  const data = [
    { id: 0, value: newsEventCount, label: "Tin tức và sự kiện" },
    { id: 1, value: newsTravelImageCount, label: "Du lịch qua hình ảnh" },
  ];
  return (
    <div className="w-[50%] text-white">
      {/* biều đồ  */}
      <div className="w-full mt-6 dark:bg-white bg-slate-200 shadow-lg p-4 rounded-sm">
        <h2 className="text-black font-semibold text-lg mb-2">
          Thống kê tin tức bài viết
        </h2>
        <PieCharts data={data} height={250}></PieCharts>
      </div>
    </div>
  );
};

export default NewsStatistics;
