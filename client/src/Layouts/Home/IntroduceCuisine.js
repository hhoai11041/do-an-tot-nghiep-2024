import React, { useEffect, useState } from "react";
import { getApi } from "../../API/GetApi";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";

const IntroduceCuisine = () => {
  const [dataCuisine, setDatCuisine] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getApi.getApiAllCuisineByProvince(setDatCuisine, setLoading);
  }, []);
  return (
    <div className="mt-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Khám phá ẩm thực Việt Nam</h1>
        <p className="mt-2 text-xl">Gợi ý những đặc sản vùng miền</p>
      </div>
      <div className="screenLarge:h-auto screenLarge:overflow-visible desktop:h-auto desktop:overflow-visible laptop:h-auto laptop:overflow-visible grid screenLarge:grid-cols-4 desktop:grid-cols-4 laptop:grid-cols-4 tablet:grid-cols-2 gap-5  mx-auto">
        {dataCuisine
          .sort(() => Math.random() - 0.5)
          .slice(0, 8)
          .map((item, index) => (
            <NavLink
              key={index}
              to={`/cuisine/all/${slugify(item.provinceSlug)}`}
              className="p-3 bg-white dark:text-black rounded-xl shadow-md text-center hover:scale-105 transition-all border"
            >
              <img
                src={item.imgRepresentative}
                alt=""
                className="w-full h-[25vh] rounded-xl object-cover "
              />
              <h2 className="font-semibold my-1">{item.provinceName}</h2>
              <p className="text-[14px] ">{item.foodCount} món đặc sắc</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default IntroduceCuisine;
