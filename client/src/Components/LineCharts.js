import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const LineCharts = ({ data, label, dataCount, color }) => {
  if (!data && !dataCount) {
    return;
  }
  return (
    <div>
      <LineChart
        xAxis={[{ scaleType: "band", data: data }]}
        series={[
          {
            data: dataCount,
            area: true,
            label: label,
            color: color,
          },
        ]}
        sx={{ width: "100%" }}
        height={500}
      />
    </div>
  );
};

export default LineCharts;
