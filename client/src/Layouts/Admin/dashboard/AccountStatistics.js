import React from "react";
import PieCharts from "../../../Components/PieCharts";

const AccountStatistics = ({ adminCount, customerCount }) => {
  const data = [
    { id: 0, value: customerCount, label: "Tài khoản người dùng" },
    { id: 1, value: adminCount, label: "Tài khoản quản trị viên" },
  ];
  return (
    <div className="w-[50%] text-white">
      {/* biều đồ  */}
      <div className="w-full mt-6 dark:bg-white bg-slate-200 shadow-lg p-4 rounded-sm">
        <h2 className="text-black font-semibold text-lg mb-2">
          Thống kê tài khoản
        </h2>
        <PieCharts data={data} height={250}></PieCharts>
      </div>
    </div>
  );
};

export default AccountStatistics;
