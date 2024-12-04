import React from "react";
import HeaderAdmin from "../../Layouts/Admin/HeaderAdmin";
import NavAdmin from "../../Layouts/Admin/NavAdmin";
import ListRestaurant from "../../Layouts/Admin/ListRestaurant";

const ManageRestaurant = () => {
  return (
    <div>
      <div className="w-full">
        <HeaderAdmin title="Quản lý nhà hàng"></HeaderAdmin>
        <NavAdmin></NavAdmin>
        <div className="w-full screenLarge:pl-[18%] desktop:pl-[21%] laptop:pl-[21%] mt-4 pr-4">
          <div className="mb-8 mt-8 w-full pb-2 border-b-orange-500 border-b-[1px]">
            <h2 className="text-[16px] font-semibold uppercase text-textPrimary">
              Danh sách nhà hàng
            </h2>
          </div>
          <ListRestaurant></ListRestaurant>
        </div>
      </div>
    </div>
  );
};

export default ManageRestaurant;
