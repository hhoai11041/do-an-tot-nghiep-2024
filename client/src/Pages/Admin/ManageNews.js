import React from "react";
import HeaderAdmin from "../../Layouts/Admin/HeaderAdmin";
import NavAdmin from "../../Layouts/Admin/NavAdmin";
import NewsEvent from "../../Layouts/Admin/NewsEvent";

const ManageNews = () => {
  return (
    <div>
      <div className="w-full h-[100vh] dark:bg-[#222437]">
        <HeaderAdmin title="Quản lý tin tức"></HeaderAdmin>
        <NavAdmin></NavAdmin>
        <div className="w-full screenLarge:pl-[18%] desktop:pl-[21%] laptop:pl-[21%] mt-4 pr-4">
          <NewsEvent></NewsEvent>
        </div>
      </div>
    </div>
  );
};

export default ManageNews;
