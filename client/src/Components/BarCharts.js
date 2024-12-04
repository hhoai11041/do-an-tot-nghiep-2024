import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { red } from "@mui/material/colors";

const extractProvince = (address) => {
  const addressParts = address.split(", "); // Tách địa chỉ thành các phần bằng dấu ", "
  return addressParts[addressParts.length - 1]; // Trả về phần cuối cùng (tỉnh/thành phố)
};

const BarCharts = ({ data }) => {
  // Tạo danh sách các tỉnh thành từ dữ liệu
  const provinces = Array.from(
    new Set(data?.map((item) => extractProvince(item.location.address)))
  );

  console.log(provinces);

  // Tạo số lượng địa điểm cho từng tỉnh
  const specialtiesCount = provinces.map((province) => {
    return data.filter(
      (item) => extractProvince(item.location.address) === province
    ).length;
  });

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: provinces }]} // Trục x là danh sách các tỉnh
      series={[
        {
          data: specialtiesCount, // Số lượng địa điểm cho mỗi tỉnh
          label: "Số lượng địa điểm",
          highlightScope: "item",
          tooltip: (params) => `${params.value}`,
          color: "blue",
        },
      ]}
      sx={{ width: "100%" }}
      height={500}
    />
  );
};

export default BarCharts;
