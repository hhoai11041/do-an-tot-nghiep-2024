import React from "react";
import HeaderAdmin from "../../Layouts/Admin/HeaderAdmin";
import NavAdmin from "../../Layouts/Admin/NavAdmin";
import TravelItineraryListAndStatistics from "../../Layouts/Admin/TravelItineraryListAndStatistics";

const ManageTraveItinerary = () => {
  return (
    <div className="w-full h-[100vh] dark:bg-[#222437]">
      <HeaderAdmin title="Quản lý lịch trình du lịch"></HeaderAdmin>
      <NavAdmin></NavAdmin>
      <div className="w-full screenLarge:pl-[18%] desktop:pl-[21%] laptop:pl-[21%] mt-4 pr-4">
        <TravelItineraryListAndStatistics></TravelItineraryListAndStatistics>
      </div>
    </div>
  );
};

export default ManageTraveItinerary;
