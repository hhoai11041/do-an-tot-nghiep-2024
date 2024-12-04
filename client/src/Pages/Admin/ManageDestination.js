import React from "react";
import HeaderAdmin from "../../Layouts/Admin/HeaderAdmin";
import NavAdmin from "../../Layouts/Admin/NavAdmin";
import ListDestination from "../../Layouts/Admin/ListDestination";

const ManageDestiantion = () => {
  return (
    <div>
      <div className="w-full">
        <HeaderAdmin title="Quản lý địa điểm"></HeaderAdmin>
        <NavAdmin></NavAdmin>
        <div className="w-full screenLarge:pl-[18%] desktop:pl-[21%] laptop:pl-[21%] mt-4 pr-4">
          <div className="mb-8 mt-8 w-full pb-2 border-b-orange-500 border-b-[1px]">
            <h2 className="text-[16px] font-semibold uppercase text-textPrimary">
              Danh sách điểm đến
            </h2>
          </div>
          <ListDestination></ListDestination>
        </div>
      </div>
    </div>
  );
};

export default ManageDestiantion;
