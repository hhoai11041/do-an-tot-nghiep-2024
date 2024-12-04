import React from "react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import { convertDateTime } from "../../Components/ConvertDateTime";
import { loadingApp } from "../../Components/Loading";

const NewsAndEvent = ({ data, loading }) => {
  return (
    <div className="mt-10">
      <h2 className="text-textPrimary font-semibold text-xl pb-2 border-b-2 mb-4 border-orange-600 w-[180px]">
        Tin tức - sự kiện
      </h2>
      <div className="w-full h-full grid screenLarge:grid-cols-4 desktop:grid-cols-4 laptop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) =>
              loadingApp.skeletonNewsAndEvent()
            )
          : data?.slice(0, data.length - 4).map((item, index) => (
              <div
                key={index}
                className="shadow-lg p-4 border dark:border-gray-700 dark:border hover:scale-105 transition-all rounded-md overflow-hidden h-[400px]"
              >
                <NavLink to={`/news/${slugify(item._id)}`}>
                  <img
                    src={item.imageNews}
                    alt=""
                    className="w-full h-[60%] rounded-lg object-cover"
                  />
                  <h2 className="mt-3 font-semibold h-[50px] flex items-center">
                    {item.titleNews}
                  </h2>
                  <em className="my-1 mb-2 block text-sm">
                    <span className="font-semibold">Ngày đăng: </span>{" "}
                    {convertDateTime(item.createdAt)}
                  </em>
                  <p
                    className="line-clamp-2 mt-1 overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  ></p>
                </NavLink>
              </div>
            ))}
      </div>
    </div>
  );
};

export default NewsAndEvent;
