import React, { useEffect, useState } from "react";
import LineCharts from "../../../Components/LineCharts";
import { getApi } from "../../../API/GetApi";
import { Skeleton, Box, Typography } from "@mui/material";

const CuisineStatistics = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApi.getApiAllCuisineByProvince(setData, setLoading);
  }, []);

  const placeNames = data?.map((item) => item.provinceName);
  const hotelCount = data?.map((item) => item.foodCount);

  return (
    <div>
      <div className="w-full bg-slate-200 mt-6 p-4 rounded-md shadow-lg dark:bg-white">
        <Typography variant="h6" className="text-black font-semibold mb-2">
          Thống kê đặc sản vùng miền
        </Typography>
        <div>
          {loading ? (
            <Box>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={400} />
            </Box>
          ) : (
            <LineCharts
              label="Số lượng đặc sản"
              data={placeNames}
              dataCount={hotelCount}
              color="#2d99a1"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CuisineStatistics;
