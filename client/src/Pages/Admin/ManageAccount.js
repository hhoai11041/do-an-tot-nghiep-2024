import React from "react";
import ListUser from "../../Layouts/Admin/ListUser";
import HeaderAdmin from "../../Layouts/Admin/HeaderAdmin";
import NavAdmin from "../../Layouts/Admin/NavAdmin";

const ManageAccount = () => {
  return (
    <div className="w-full h-[100vh] dark:bg-[#222437]">
      <HeaderAdmin title="Quản lý - Phân quyền tài khoản"></HeaderAdmin>
      <NavAdmin></NavAdmin>
      <div className="w-full screenLarge:pl-[18%] desktop:pl-[21%] laptop:pl-[21%] mt-4 pr-4">
        <div className="mb-8 mt-8 w-full pb-2 border-b-orange-500 border-b-[1px]">
          <h2 className="text-[16px] font-semibold uppercase text-textPrimary">
            Danh sách tài khoản
          </h2>
        </div>
        <ListUser></ListUser>
      </div>
    </div>
  );
};

export default ManageAccount;
