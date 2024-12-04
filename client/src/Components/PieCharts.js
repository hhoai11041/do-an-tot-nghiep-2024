import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

const generateUniqueColors = (count) => {
  const colors = new Set();
  while (colors.size < count) {
    colors.add(generateRandomColor());
  }
  return Array.from(colors);
};

const PieCharts = ({ data, width, height }) => {
  // Tạo danh sách 15 màu ngẫu nhiên
  const colors = generateUniqueColors(15);

  return (
    <PieChart
      series={[
        {
          data: data.map((item, index) => ({
            ...item,
            color: colors[index], // Áp dụng màu từ danh sách
          })),
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      width={width}
      height={height}
    />
  );
};

export default PieCharts;
