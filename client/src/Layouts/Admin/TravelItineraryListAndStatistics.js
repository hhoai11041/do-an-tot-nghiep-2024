import React from "react";

import TravelItineraryList from "./TravelItineraryList";

const TravelItineraryListAndStatistics = () => {
  return (
    <div>
      <div className="mb-8 mt-8 w-full pb-2 border-b-orange-500 border-b-[1px]">
        <h2 className="text-[16px] font-semibold uppercase text-textPrimary">
          Danh sách lịch trình theo tỉnh thành
        </h2>
      </div>
      <TravelItineraryList />
    </div>
  );
};

export default TravelItineraryListAndStatistics;
