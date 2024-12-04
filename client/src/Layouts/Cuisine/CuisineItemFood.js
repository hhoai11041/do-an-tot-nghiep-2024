import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import slugify from "react-slugify";
import { getApi } from "../../API/GetApi";
import { loadingApp } from "../../Components/Loading";
import NotFoundData from "../../Components/NotFoundData";

const CuisineItemFood = ({
  filterByRegion,
  filterByProvince,
  slugProvince,
}) => {
  const [numberPageFood, setNumberPageFood] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dataAllFood, setDataAllFood] = useState([]);
  const [provinceFood, setProvinceFood] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (filterByProvince) {
        await getApi.getApiFoodByProvince(
          setDataAllFood,
          slugify(filterByProvince),
          setProvinceFood,
          setLoading
        );
        setTotalPages(0);
      } else if (filterByRegion === "tat-ca") {
        await getApi.getApiAllCuisinePage(
          setDataAllFood,
          setLoading,
          numberPageFood,
          setTotalPages
        );
      } else if (
        filterByRegion === "Bắc Bộ" ||
        filterByRegion === "Nam Bộ" ||
        filterByRegion === "Trung Bộ"
      ) {
        await getApi.getApiFoodByRegion(
          setDataAllFood,
          filterByRegion,
          setLoading,
          numberPageFood,
          setTotalPages
        );
        setNumberPageFood(1);
      } else {
        setDataAllFood([]);
        setLoading(false);
        setNumberPageFood(1);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [numberPageFood, filterByRegion, filterByProvince, slugProvince]);

  const handlePageChange = (event, value) => {
    setNumberPageFood(value);
  };

  return (
    <div>
      <div className="mb-10">
        <div className="w-full mb-8">
          {loading ? (
            loadingApp.skeletonItemFood()
          ) : dataAllFood.length === 0 ? (
            <NotFoundData></NotFoundData>
          ) : (
            <div className="w-full grid mobile:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-3 screenLarge:grid-cols-3 screenLarge:gap-7 desktop:gap-7 laptop:gap-7 tablet:gap-7  mobile:gap-3">
              {dataAllFood.map((item, index) => (
                <NavLink
                  key={index}
                  to={`/cuisine/detail/${slugify(
                    item.provinceName || provinceFood
                  )}/${slugify(item.foodId)}`}
                >
                  <div className="relative shadow-lg dark:border dark:border-gray-700 rounded-lg overflow-hidden pb-3 cursor-pointer">
                    <img
                      src={item.imgFood}
                      alt={item.foodName}
                      className="w-full h-[170px] object-cover"
                    />
                    <div className="w-full h-[170px] bg-black absolute top-0 opacity-20"></div>

                    <div className="p-2">
                      <h2 className="text-[18px] font-bold line-clamp-1">
                        {item.foodName}
                      </h2>
                      <p className="text-sm leading-6 line-clamp-2 mt-1">
                        {item.foodDesc}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="px-4 py-1 bg-bgPrimary rounded-md text-white opacity-90 text-[14px]">
                          <p>{item.provinceName || provinceFood}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Hiển thị Pagination chỉ khi có dữ liệu */}
        {dataAllFood.length > 0 && totalPages > 0 && (
          <div className="w-full flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                variant="outlined"
                shape="rounded"
                color="secondary"
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default CuisineItemFood;
