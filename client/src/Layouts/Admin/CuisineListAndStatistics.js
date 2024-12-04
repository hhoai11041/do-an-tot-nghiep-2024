import React from "react";
import CuisineList from "./CuisineList";

const CuisineListAndStatistics = () => {
  return (
    <div>
      <div className="mb-8 mt-8 w-full pb-2 border-b-orange-500 border-b-[1px]">
        <h2 className="text-[16px] font-semibold uppercase text-textPrimary">
          Danh sách đặc sản theo tỉnh thành
        </h2>
      </div>
      <CuisineList />
    </div>
  );
};

export default CuisineListAndStatistics;
